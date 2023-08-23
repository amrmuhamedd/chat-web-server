import { IChat } from "core/application/interfaces/models/chatModel";
import { ToUser } from "./user";
import { IUser } from "core/application/interfaces/models/userModel";
import { Chat } from "core/domain/entities/chat";

export const ToChat = (chatDocument: IChat, participants: IUser[]): Chat => {
  const participantsMap = new Map<string, IUser>();
  participants.forEach((user) =>
    participantsMap.set(user._id.toString(), user)
  );

  const chatParticipants = chatDocument.participants.map((participantId) => {
    const participant = participantsMap.get(participantId._id.toString());
    if (!participant) {
      throw new Error(`Participant with ID ${participantId} not found.`);
    }
    return ToUser(participant);
  });

  const newChat = new Chat({
    participants: chatParticipants,
  });
  newChat.setId(chatDocument._id.toString());
  return newChat;
};
