import { Router } from "express";
import { MessageController } from "../controllers/messages-controller";
import { MessageRepository } from "infrastructure/db/repository/messageRepository";
import { ListMessagesByChatIdInteractor } from "@app/core/application/usecases/messages/listMessagesByChatIdUseCase";
import { SendMessageUseCase } from "@app/core/application/usecases/messages/sendMessageUseCase";
import { ChatRepository } from "@app/infrastructure/db/repository/chatRepository";


export function messageRoutes(router: Router) {
  const messageRepository = new MessageRepository();
  const chatRepository = new ChatRepository();
  const createMessageInteractor = new SendMessageUseCase(chatRepository , messageRepository);
  const listMessagesByChatIdInteractor = new ListMessagesByChatIdInteractor(
    messageRepository
  );
  const messageController = new MessageController(
    createMessageInteractor,
    listMessagesByChatIdInteractor
  );
  router.post(
    "/messages/send",
    messageController.createMessage.bind(messageController)
  );
  router.get(
    "/messages/:chatId",
    messageController.listMessagesByChatId.bind(messageController)
  );
  
}