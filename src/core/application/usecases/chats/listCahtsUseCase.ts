import { IChatRepository } from "core/application/interfaces/repository/chatRepository";
import { Chat } from "core/domain/entities/chat";

export class ListChatsUseCase {
  private chatRepository: IChatRepository;

  constructor(messageRepository: IChatRepository) {
    this.chatRepository = messageRepository;
  }

  async execute(userId: string): Promise<Chat[]> {
    return this.chatRepository.listChatsByUserId(userId);
  }
}
