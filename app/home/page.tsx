'use server';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          cipherchat.ai
        </h1>
        {/* <div className="text-3xl md:text-6xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
         
        </div> */}
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto"></div>
    </div>
  );
};

export default HomePage;
