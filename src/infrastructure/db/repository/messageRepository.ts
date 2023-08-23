import { Types } from "mongoose";
import { Message } from "@app/core/domain/entities/message";
import { IMessageRepository } from "@app/core/application/interfaces/repository/messageRepository"; 
import { MessageModel } from "../models/message";
import { ChatModel } from "infrastructure/db/models/chat";
import { toMessagesMapper } from "infrastructure/db/mapper/message";
class MessageRepository implements IMessageRepository {
  async createMessage(messageData: Message): Promise<Message> {
    const createdMessage = await MessageModel.create(messageData);
    return createdMessage.toObject();
  }

  async getMessageById(messageId: string): Promise<Message | null> {
    const message = await MessageModel.findById(messageId);
    return message ? message.toObject() : null;
  }

  async updateMessage(
    messageId: string,
    newData: Partial<Message>
  ): Promise<Message | null> {
    const updatedMessage = await MessageModel.findByIdAndUpdate(
      messageId,
      newData,
      {
        new: true,
      }
    );
    return updatedMessage ? updatedMessage.toObject() : null;
  }
  async listMessagesByChatId(chatId: string): Promise<Message[]> {
    try {
      const chat = await ChatModel.findById(chatId);
      if (!chat) {
        throw new Error(`Chat with ID ${chatId} not found`);
      }

      const messages = await MessageModel.find({ chatId }).populate(
        "meta.receiver meta.sender meta.userData"
      );
      return toMessagesMapper(messages);
    } catch (error) {
      console.error("Error listing messages by chat ID:", error);
      throw new Error("Failed to list messages");
    }
  }
  async deleteMessage(messageId: string): Promise<boolean> {
    const result = await MessageModel.deleteOne({
      _id: new Types.ObjectId(messageId),
    });
    return result.deletedCount === 1;
  }
}

export { MessageRepository };
