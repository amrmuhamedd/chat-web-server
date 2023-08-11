import { Chat } from "@app/core/domain/entities/chat";
import { IChatRepository } from "../../interfaces/repository/chatRepository";

export class ListChatsUseCase {
  private chatRepository: IChatRepository;

  constructor(messageRepository: IChatRepository) {
    this.chatRepository = messageRepository;
  }

  async execute(userId: string): Promise<Chat[]> {
    return this.chatRepository.listChatsByUserId(userId);
  }
}
