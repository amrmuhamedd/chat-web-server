import { IChatRepository } from "@interfaces/data-access/chatRepository";
import { Chat } from "@entities/chat";

export class ListChatsUseCase {
  private chatRepository: IChatRepository;

  constructor(messageRepository: IChatRepository) {
    this.chatRepository = messageRepository;
  }

  async execute(userId: string): Promise<Chat[]> {
    return this.chatRepository.listChatsByUserId(userId);
  }
}
