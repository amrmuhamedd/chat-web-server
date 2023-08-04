import { IChat } from "@interfaces/models/chatModel";
import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema<IChat>({
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }], // Reference to User model
});

const ChatModel = mongoose.model("Chat", chatSchema);

export { ChatModel };
