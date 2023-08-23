import { IChatRepository } from "../../interfaces/repository/chatRepository";
import { IMessageRepository } from "../../interfaces/repository/messageRepository";
import { Chat } from "@app/core/domain/entities/chat";
import { Message } from "@app/core/domain/entities/message";
import { IUserRepository } from "../../interfaces/repository/userRepository";
import { UserRepository } from "@app/infrastructure/db/repository/userRepository";

export class SendMessageUseCase {
  private chatRepository: IChatRepository;
  private messageRepository: IMessageRepository;
private userRepo : IUserRepository =new  UserRepository()
  constructor(
    chatRepository: IChatRepository,
    messageRepository: IMessageRepository
  ) {
    this.chatRepository = chatRepository;
    this.messageRepository = messageRepository;
  }

  async sendMessage(
    senderId: string,
    receiverId: string,
    messageText: string,
  ): Promise<Message> {
    // Check if a chat already exists between sender and receiver
    const sender = await this.userRepo.getUserById(senderId);
    const receiver = await this.userRepo.getUserById(receiverId);
    if(!sender)  throw new Error("sender should be exist user");
    if(!receiver)  throw new Error("sender should be exist user");

    let chat = await this.chatRepository.getChatByParticipants(
      sender?.getId(),
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
  return  await this.messageRepository.createMessage(message);
  }
}
