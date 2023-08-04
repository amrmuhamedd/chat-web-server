import { Chat } from "@entities/chat";
import { IUser } from "@interfaces/models/userModel";
import { IChat } from "@interfaces/models/chatModel";
import { ToUser } from "./user";

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
