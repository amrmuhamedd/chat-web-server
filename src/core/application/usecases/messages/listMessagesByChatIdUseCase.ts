import { Message } from "@app/core/domain/entities/message";
import { IMessageRepository } from "../../interfaces/repository/messageRepository";

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
