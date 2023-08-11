import { Message } from "core/domain/entities/message";
import { MessageDocument } from "../models/message";
import { User } from "core/domain/entities/user";

export const toMessage = (messageDoc: MessageDocument): Message => {
  const meta = messageDoc.meta;
  const receiver = new User({
    firstName: meta.receiver.firstName,
    lastName: meta.receiver.lastName,
    username: meta.receiver?.username,
    email: meta.receiver?.email,
  });
  receiver.setId(meta.receiver._id.toString());

  const sender = new User({
    firstName: meta.sender.firstName,
    lastName: meta.sender.lastName,
    username: meta.sender?.username,
    email: meta.sender?.email,
  });
  sender.setId(meta.sender._id.toString());

  const message = new Message({
    text: messageDoc.text,
    time: messageDoc.time,
    chatId: messageDoc.chatId._id.toString(),
    meta: {
      receiver,
      sender,
      sent: messageDoc.meta.sent,
      received: messageDoc.meta.received,
      read: messageDoc.meta.read,
      isForwarded: messageDoc.meta.isForwarded,
    },
    attachments: messageDoc.attachments,
  });

  return message;
};

export const toMessagesMapper = (
  messageDocuments: MessageDocument[]
): Message[] => {
  return messageDocuments.map((messageDoc) => {
    const meta = messageDoc.meta;
    const receiver = new User({
      firstName: meta.receiver?.firstName,
      lastName: meta.receiver?.lastName,
      username: meta.receiver?.username,
      email: meta.receiver?.email,
    });

    receiver.setId(meta.receiver._id.toString());

    const sender = new User({
      firstName: meta.sender.firstName,
      lastName: meta.sender.lastName,
      username: meta.receiver?.username,
      email: meta.receiver?.email,
    });

    sender.setId(meta.sender._id.toString());

    const message = new Message({
      text: messageDoc.text,
      time: messageDoc.time,
      chatId: messageDoc.chatId._id.toString(),
      meta: {
        receiver,
        sender,
        sent: messageDoc.meta.sent,
        received: messageDoc.meta.received,
        read: messageDoc.meta.read,
        isForwarded: messageDoc.meta.isForwarded,
      },
      attachments: messageDoc.attachments,
    });

    return message;
  });
};
