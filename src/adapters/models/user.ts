import mongoose, { Types } from "mongoose";
import { STATUS_TYPES } from "@interfaces/common";
import { IUser } from "@interfaces/models/userModel";

const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: mongoose.Schema.Types.Mixed },
  status: { type: String, enum: STATUS_TYPES },
  meta: {
    unRead: { type: Number },
    status: { type: String, enum: STATUS_TYPES },
  },
});

userSchema.pre("save", function (next) {
  this._id = new Types.ObjectId();

  next();
});
const UserModel = mongoose.model<IUser>("User", userSchema);

export { UserModel };
