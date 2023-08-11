import express from "express";
import { ChatController } from "../controllers/chats-contrller";
import { ChatRepository } from "../../infrastructure/db/repository/chatRepository";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";

const chatRouter = express.Router();

const userRepository = new UserRepository();
const chatRepository = new ChatRepository();

const chatController = new ChatController(chatRepository, userRepository);

chatRouter.post("/", chatController.createChat.bind(chatController));
chatRouter.get(
  "/:userId",
  chatController.listChatsByUserId.bind(chatController)
);

export { chatRouter };
