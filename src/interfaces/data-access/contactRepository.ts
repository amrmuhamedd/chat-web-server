import { Contact } from "@entities/contact";

export interface ContactRepository {
  createContact(contact: Contact): Promise<Contact>;
  deleteContact(userId: string, contactId: string): Promise<boolean>;
  listContactsByUserId(userId: string): Promise<Contact[]>;
}
