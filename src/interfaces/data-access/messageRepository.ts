import { Message } from "@entities/message";

interface IMessageRepository {
  createMessage(messageData: Message): Promise<Message>;
  getMessageById(messageId: string): Promise<Message | null>;
  updateMessage(
    messageId: string,
    newData: Partial<Message>
  ): Promise<Message | null>;
  deleteMessage(messageId: string): Promise<boolean>;
  listMessagesByChatId(chatId: string): Promise<Message[]>;
}

export { IMessageRepository };
