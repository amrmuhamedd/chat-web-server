import { IMessage } from "core/application/interfaces/models/messageModel";
import { Schema, Document, model } from "mongoose";

export interface MessageDocument extends Document, IMessage {}

const messageSchema = new Schema<IMessage>({
  mId: { type: Number, required: false },
  text: { type: String },
  time: { type: String, required: true },
  meta: {
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userData: { type: Schema.Types.ObjectId, ref: "Contact" },
    sent: { type: Boolean, required: false },
    received: { type: Boolean, required: false },
    read: { type: Boolean, required: false },
    isForwarded: { type: Boolean },
  },
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  attachments: [{ type: Schema.Types.Mixed }],
});

export const MessageModel = model<MessageDocument>("Message", messageSchema);
