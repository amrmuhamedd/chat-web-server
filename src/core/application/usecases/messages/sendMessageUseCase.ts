import { User } from "@app/core/domain/entities/user";
import { IChatRepository } from "../../interfaces/repository/chatRepository";
import { IMessageRepository } from "../../interfaces/repository/messageRepository";
import { Chat } from "@app/core/domain/entities/chat";
import { Message } from "@app/core/domain/entities/message";

export class SendMessageUseCase {
  private chatRepository: IChatRepository;
  private messageRepository: IMessageRepository;

  constructor(
    chatRepository: IChatRepository,
    messageRepository: IMessageRepository
  ) {
    this.chatRepository = chatRepository;
    this.messageRepository = messageRepository;
  }

  async sendMessage(
    sender: User,
    receiver: User,
    messageText: string
  ): Promise<void> {
    // Check if a chat already exists between sender and receiver
    let chat = await this.chatRepository.getChatByParticipants(
      sender.getId(),
      receiver.getId()
    );

    if (!chat) {
      // Create a new chat if one doesn't exist
      chat = new Chat({
        participants: [sender, receiver],
      });
      await this.chatRepository.createChat(chat);
    }

    // Create a new message
    const message = new Message({
      meta: {
        sender: sender.getId(),
        receiver: receiver.getId(),
      },
      text: messageText,
      time: new Date().toISOString(),
      chatId: chat.getId(),
    });

    // Save the message to the database
    await this.messageRepository.createMessage(message);
  }
}
