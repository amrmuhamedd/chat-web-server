import { Document, Types } from "mongoose";
import { IMessage } from "./messageModel";
import { IUser } from "./userModel";

interface IChat extends Document {
  _id: Types.ObjectId;
  participants: IUser[];
}

export { IChat };
