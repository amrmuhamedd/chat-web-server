import { ContactRepository } from "@app/core/application/interfaces/repository/contactRepository";
import { ContactModel } from "../models/contact";
import { Contact } from "@app/core/domain/entities/contact";
import { ToContact } from "infrastructure/db/mapper/contact";

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
