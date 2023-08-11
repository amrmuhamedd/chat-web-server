import { Types } from "mongoose";
import { IUser } from "./userModel";

interface IChat extends Document {
  _id: Types.ObjectId;
  participants: IUser[];
}

export { IChat };
