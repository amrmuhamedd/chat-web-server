import { Contact } from "@entities/contact";
import { IContact } from "@interfaces/models/contact";

export const ToContact = (contactDocument: IContact): Contact => {
  const { userId, contactId } = contactDocument;

  return new Contact({
    userId: userId.toString(),
    contactId: contactId.toString(),
  });
};
