import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  _id: string;
  email: string;
  refreshToken: string;
  accessToken: string;
  displayName: string;
  calendarId: string;
}

const UserSchema = new mongoose.Schema({
  _id: String,
  email: String,
  refreshToken: String,
  accessToken: String,
  displayName: String,
  calendarId: String,
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
