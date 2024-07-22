'use server';
import UserModel from '@/models/User';
import dbConnect from '@/lib/dbConnect';

const HomePage = async () => {
  await dbConnect();
  const user = await UserModel.find();

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          cipherchat.ai
        </h1>
        <h1 className="text-3xl m-6 underline">User details</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Verified</th>
                <th className="py-2 px-4 border-b">Message Acceptance</th>
                <th className="py-2 px-4 border-b">Email ID</th>
              </tr>
            </thead>
            <tbody>
              {user.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{item.username}</td>
                  <td className="py-2 px-4 border-b">
                    {item.isVerified ? 'Verified user' : 'Non verified user'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {item?.isAcceptingMessage ? 'Yes' : 'No'}
                  </td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto"></div>
    </div>
  );
};

export default HomePage;
