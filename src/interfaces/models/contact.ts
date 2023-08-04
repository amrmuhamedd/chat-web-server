import { Document, Types } from "mongoose";
import { IUser } from "./userModel";

interface IContact extends Document {
  _id: Types.ObjectId;
  userId: IUser["_id"];
  contactId: IUser["_id"];
  addedAt: Date;
}

export { IContact };
