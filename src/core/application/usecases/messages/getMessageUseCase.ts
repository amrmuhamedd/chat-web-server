import { Message } from "@app/core/domain/entities/message";
import { IMessageRepository } from "../../interfaces/repository/messageRepository";

export class GetMessageInteractor {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async getMessageById(messageId: string): Promise<Message | null> {
    try {
      const message = await this.messageRepository.getMessageById(messageId);
      return message;
    } catch (error) {
      console.error("Error getting message:", error);
      throw new Error("Failed to get message");
    }
  }
}
