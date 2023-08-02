import { STATUS_TYPES } from "@interfaces/common";
import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  profileImage?: any;
  status?: STATUS_TYPES;
  meta?: {
    unRead?: number;
    status?: STATUS_TYPES;
  };
}
