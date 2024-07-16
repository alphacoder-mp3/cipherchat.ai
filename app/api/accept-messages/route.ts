import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import UserModel from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { User } from 'next-auth';

export async function POST(request: Request) {
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

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: 'failed  to update user status to accept messages',
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Message acceptance status updated successfully',
        // updatedUser,
        isAcceptingMessage: updatedUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('failed  to update user status to accept messages');
    return Response.json(
      {
        success: false,
        message: 'failed  to update user status to accept messages',
      },
      { status: 500 }
    );
  }
}

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

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error is getting messages accepting status');
    return Response.json(
      {
        success: false,
        message: 'Error is getting messages accepting status ',
      },
      { status: 500 }
    );
  }
}
