
import { IChat } from "core/application/interfaces/models/chatModel";
import { ToUser } from "./user";
import { IUser } from "core/application/interfaces/models/userModel";
import { Chat } from "core/domain/entities/chat";

export const ToChat = (chatDocument: IChat, participants: IUser[]): Chat => {
  const participantsMap = new Map<string, IUser>();
  participants.forEach((user) =>
    participantsMap.set(user._id.toString(), user)
  );

  return new Chat({
    _id: chatDocument._id.toString(),
    participants: participants.map((user) => ToUser(user)),
  });
};
