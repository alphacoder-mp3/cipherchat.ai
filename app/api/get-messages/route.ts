import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import UserModel, { Message } from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { User } from 'next-auth';
import mongoose from 'mongoose';

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: 'Not Authenticated',
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      {
        $project: {
          messages: 1,
        },
      },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 401 }
      );
    }

    const userMessages = user[0].messages;

    if (!userMessages || userMessages.length === 0) {
      return Response.json(
        {
          success: true,
          messages: [],
        },
        { status: 200 }
      );
    }

    const sortedMessages = userMessages.sort(
      (a: Message, b: Message) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return Response.json(
      {
        success: true,
        messages: sortedMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('An Unexpected error occurred', error);
    return Response.json(
      {
        success: false,
        message: ' Not Authenticated',
      },
      { status: 500 }
    );
  }
}
