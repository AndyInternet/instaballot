import mongoose from 'mongoose';

export const connectMongo = () => {
  const uri = process.env.CONNECTION_STRING || '';

  const options = {
    autoIndex: false,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
  };

  mongoose
    .set('strictQuery', false)
    .connect(uri, options)
    .then((conn) => console.info(`  [mongo]: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`))
    .catch((err) => console.error(err.reason));
};
