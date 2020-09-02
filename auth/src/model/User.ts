import mongoose from 'mongoose';
import { Profile } from 'passport-google-oauth20';

export interface IUser extends mongoose.Document {
  _id: string;
  email: string;
  refreshToken: string;
  accessToken: string;
  displayName: string;
  calendarId: string;
}

export interface IUserModel extends mongoose.Model<IUser> {
  findOneOrCreate(accessToken: string, refreshToken: string, profile: Profile): Promise<IUser>;
}

const UserSchema = new mongoose.Schema({
  _id: String,
  email: String,
  refreshToken: String,
  accessToken: String,
  displayName: String,
  calendarId: String,
});

UserSchema.statics.findOneOrCreate = async function findOneOrCreate(
  accessToken: string,
  refreshToken: string,
  profile: Profile
) {
  try {
    const user = await this.findOne({ _id: profile.id });
    if (user) {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      return user.save();
    }

    const newUser = new User({
      _id: profile.id,
      email: profile.emails ? profile.emails[0].value : null,
      accessToken: accessToken,
      refreshToken: refreshToken,
      displayName: profile.displayName,
    });
    return newUser.save();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const User = mongoose.model<IUser, IUserModel>('User', UserSchema);
export default User;
