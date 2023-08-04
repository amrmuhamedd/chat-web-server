import { Message } from "@entities/message";
import { IMessageRepository } from "@interfaces/data-access/messageRepository";

export class CreateMessageInteractor {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async createMessage(messageData: Message): Promise<Message> {
    try {
      const createdMessage = await this.messageRepository.createMessage(
        messageData
      );
      return createdMessage;
    } catch (error) {
      console.error("Error creating message:", error);
      throw new Error("Failed to create message");
    }
  }
}
