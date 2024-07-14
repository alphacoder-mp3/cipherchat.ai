import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    //for edge case environment
    console.log('Already connected to db');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '');
    // console.log({ db }); // test this once then delete
    connection.isConnected = db.connections[0].readyState;
    console.log('Db connection success');
  } catch (error) {
    console.log('Database connection failed', error);
    process.exit(1); // gracefully exit always
  }
}

export default dbConnect;
