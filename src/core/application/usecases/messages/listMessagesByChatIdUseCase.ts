import { IMessageRepository } from "core/application/interfaces/repository/messageRepository";
import { Message } from "core/domain/entities/message";

export class ListMessagesByChatIdInteractor {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async listMessagesByChatId(chatId: string): Promise<Message[]> {
    try {
      const messages = await this.messageRepository.listMessagesByChatId(
        chatId
      );
      return messages;
    } catch (error) {
      console.error("Error listing messages:", error);
      throw new Error("Failed to list messages");
    }
  }
}
