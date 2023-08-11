import { Request, Response, NextFunction } from "express";
import { ChatRepository } from "../../infrastructure/db/repository/chatRepository";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { Chat } from "../../domain/entities/chat";

export class ChatController {
  private chatRepository: ChatRepository;
  private userRepository: UserRepository;

  constructor(chatRepository: ChatRepository, userRepository: UserRepository) {
    this.chatRepository = chatRepository;
    this.userRepository = userRepository;
  }

  async createChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { participants } = req.body;

      // Check if participants exist and are valid users
      const participantsExist = await Promise.all(
        participants.map(async (participantId: string) => {
          const user = await this.userRepository.getUserById(participantId);
          return !!user;
        })
      );

      if (!participantsExist.every((exist) => exist)) {
        return res.status(400).json({ error: "Invalid participants" });
      }

      // Create a new chat
      const newChat = new Chat({ participants });
      await this.chatRepository.createChat(newChat);

      res.status(201).json({ message: "Chat created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async listChatsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;

      // Get chats for the user
      const chats = await this.chatRepository.listChatsByUserId(userId);

      res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }
}
