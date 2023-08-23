import { IUser } from "./userModel";
import { Document } from "mongoose";
import { IChat } from "./chatModel";
import { AttachmentTypes } from "../common";

export interface IMessage extends Document {
  mId: number;
  text?: string;
  time: string;
  meta: {
    receiver: IUser;
    sender: IUser;
    userData?: IUser;
    sent?: boolean;
    received?: boolean;
    read?: boolean;
    isForwarded?: boolean;
  };
  chatId: IChat;
  attachments?: AttachmentTypes[];
}
