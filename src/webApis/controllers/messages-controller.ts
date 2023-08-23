import { ListMessagesByChatIdInteractor } from "@app/core/application/usecases/messages/listMessagesByChatIdUseCase";
import { SendMessageUseCase } from "@app/core/application/usecases/messages/sendMessageUseCase";
import { Request, Response, NextFunction } from "express";

export class MessageController {
  private sendMessageUseCase: SendMessageUseCase;
  private listMessagesByChatIdInteractor: ListMessagesByChatIdInteractor;

  constructor(
    createMessageInteractor: SendMessageUseCase,
    listMessagesByChatIdInteractor: ListMessagesByChatIdInteractor
  ) {
    this.sendMessageUseCase = createMessageInteractor;
    this.listMessagesByChatIdInteractor = listMessagesByChatIdInteractor;
  }

  async createMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const {senderId, receiverId, text } = req.body;
      
      const message = await this.sendMessageUseCase.sendMessage(senderId , receiverId , text);
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
