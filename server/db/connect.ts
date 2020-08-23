import mongoose from 'mongoose';

const connectWithMongoDb = (): void => {
  const { MONGO_DB_HOST, MONGO_DB_NAME, MONGO_DB_USERNAME, MONGO_DB_PASSWORD } = process.env;
  const db = `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:27017/${MONGO_DB_NAME}?authSource=admin`;

  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch((error) => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};

export default connectWithMongoDb;
