import { Chat } from "@app/core/domain/entities/chat";

export interface IChatRepository {
  createChat(chat: Chat): Promise<Chat>;
  getChatById(chatId: string): Promise<Chat | null>;
  listChatsByUserId(userId: string): Promise<Chat[]>;
  updateChat(chatId: string, newData: Partial<Chat>): Promise<Chat | null>;
  deleteChat(chatId: string): Promise<boolean>;
  getChatByParticipants(
    participant1: string,
    participant2: string
  ): Promise<Chat | null>;
}
