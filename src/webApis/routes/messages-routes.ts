import express from "express";
import { MessageController } from "@adapters/controllers/messages-controller";
import { MessageRepository } from "infrastructure/db/repository/messageRepository";
import { CreateMessageInteractor } from "@useCases/messages/createMessageUseCase";
import { ListMessagesByChatIdInteractor } from "@useCases/messages/listMessagesByChatIdUseCase";

const router = express.Router();

const messageRepository = new MessageRepository();
const createMessageInteractor = new CreateMessageInteractor(messageRepository);
const listMessagesByChatIdInteractor = new ListMessagesByChatIdInteractor(
  messageRepository
);

const messageController = new MessageController(
  createMessageInteractor,
  listMessagesByChatIdInteractor
);

// Define routes
router.post(
  "/messages",
  messageController.createMessage.bind(messageController)
);
router.get(
  "/messages/:chatId",
  messageController.listMessagesByChatId.bind(messageController)
);

export { router as messageRoutes };
