import { Request, Response, NextFunction } from "express";
import { CreateMessageInteractor } from "@useCases/messages/createMessageUseCase";
import { ListMessagesByChatIdInteractor } from "@useCases/messages/listMessagesByChatIdUseCase";
import { Message } from "@entities/message";

export class MessageController {
  private createMessageInteractor: CreateMessageInteractor;
  private listMessagesByChatIdInteractor: ListMessagesByChatIdInteractor;

  constructor(
    createMessageInteractor: CreateMessageInteractor,
    listMessagesByChatIdInteractor: ListMessagesByChatIdInteractor
  ) {
    this.createMessageInteractor = createMessageInteractor;
    this.listMessagesByChatIdInteractor = listMessagesByChatIdInteractor;
  }

  async createMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId, senderId, receiverId, text, time } = req.body;
      const message = await this.createMessageInteractor.createMessage(
        new Message({
          chatId,
          time: time || Date.now().toString(),
          meta: { sender: senderId as string, receiver: receiverId as string },
          text,
        })
      );
      res.json(message);
    } catch (error) {
      next(error);
    }
  }

  async listMessagesByChatId(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatId } = req.params;
      const messages =
        await this.listMessagesByChatIdInteractor.listMessagesByChatId(chatId);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
}
