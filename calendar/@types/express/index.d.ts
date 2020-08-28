import { IUser } from '../../../auth/src/model/User';

declare global {
  namespace Express {
    interface Request {
      currentUser: IUser | undefined;
    }
  }
}
