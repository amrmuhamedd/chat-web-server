import { User } from "@entities/user";
import { AttachmentTypes, ImageTypes } from "@interfaces/common";
import { IMessage } from "@interfaces/models/messageModel";
import { Schema, Document, model } from "mongoose";

export interface MessageDocument extends Document, IMessage {}

const messageSchema = new Schema<IMessage>({
  mId: { type: Number, required: true },
  text: { type: String },
  time: { type: String, required: true },
  meta: {
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userData: { type: Schema.Types.ObjectId, ref: "Contact" },
    sent: { type: Boolean, required: true },
    received: { type: Boolean, required: true },
    read: { type: Boolean, required: true },
    isForwarded: { type: Boolean },
  },
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  attachments: [{ type: Schema.Types.Mixed }],
});

export const MessageModel = model<MessageDocument>("Message", messageSchema);
