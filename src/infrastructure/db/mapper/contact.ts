import { IContact } from "core/application/interfaces/models/contact";
import { Contact } from "core/domain/entities/contact";

export const ToContact = (contactDocument: IContact): Contact => {
  const { userId, contactId } = contactDocument;

  return new Contact({
    userId: userId.toString(),
    contactId: contactId.toString(),
  });
};
