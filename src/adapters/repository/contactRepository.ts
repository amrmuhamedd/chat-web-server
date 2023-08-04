import { ContactRepository } from "@interfaces/data-access/contactRepository";
import { ContactModel } from "../models/contact";
import { Contact } from "@entities/contact";
import { ToContact } from "@adapters/mapper/contact";

export class MongoDBContactRepository implements ContactRepository {
  async createContact(contact: Contact): Promise<Contact> {
    const createdContact = await ContactModel.create(contact);
    return ToContact(createdContact);
  }

  async deleteContact(userId: string, contactId: string): Promise<boolean> {
    const result = await ContactModel.deleteOne({ userId, contactId });
    return result.deletedCount === 1;
  }

  async listContactsByUserId(userId: string): Promise<Contact[]> {
    const contacts = await ContactModel.find({ userId }).populate("contactId");
    return contacts.map(ToContact);
  }
}
