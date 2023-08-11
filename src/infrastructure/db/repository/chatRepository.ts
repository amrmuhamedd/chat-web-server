import { IChatRepository } from "core/application/interfaces/repository/chatRepository";
import { ChatModel } from "../models/chat";
import { ToChat } from "infrastructure/db/mapper/chat";
import { Chat } from "core/domain/entities/chat";

export class ChatRepository implements IChatRepository {
  async createChat(chat: Chat): Promise<Chat> {
    const createdChat = await (
      await ChatModel.create(chat)
    ).populate("participants");
    return ToChat(createdChat, createdChat.participants);
  }

  async getChatById(chatId: string): Promise<Chat | null> {
    const chat = await ChatModel.findById(chatId);
    return chat ? chat.toObject() : null;
  }

  async updateChat(
    chatId: string,
    newData: Partial<Chat>
  ): Promise<Chat | null> {
    const updatedChat = await ChatModel.findByIdAndUpdate(chatId, newData, {
      new: true,
    });
    return updatedChat ? updatedChat.toObject() : null;
  }

  async listChatsByUserId(userId: string): Promise<Chat[]> {
    const chats = await ChatModel.find({ participants: userId });
    return chats.map((chat) => ToChat(chat, chat.participants));
  }

  async deleteChat(chatId: string): Promise<boolean> {
    const deletedChat = await ChatModel.findByIdAndDelete(chatId);
    return deletedChat ? true : false;
  }
  async getChatByParticipants(
    participant1: string,
    participant2: string
  ): Promise<Chat | null> {
    const chat = await ChatModel.findOne({
      participants: {
        $all: [participant1, participant2],
      },
    });
    return chat ? ToChat(chat, chat.participants) : null;
  }
}
