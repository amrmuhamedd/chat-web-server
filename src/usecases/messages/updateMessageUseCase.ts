import { Message } from "@entities/message";
import { IMessageRepository } from "@interfaces/data-access/messageRepository";

export class UpdateMessageInteractor {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async updateMessage(
    messageId: string,
    newData: Partial<Message>
  ): Promise<Message | null> {
    try {
      const updatedMessage = await this.messageRepository.updateMessage(
        messageId,
        newData
      );
      return updatedMessage;
    } catch (error) {
      console.error("Error updating message:", error);
      throw new Error("Failed to update message");
    }
  }
}
