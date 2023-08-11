import { Contact } from "@app/core/domain/entities/contact";
import { ContactRepository } from "../../interfaces/repository/contactRepository";

export class CreateContactInteractor {
  private contactRepository: ContactRepository;

  constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  async createContact(userId: string, contactId: string): Promise<Contact> {
    const contact = new Contact({ userId, contactId });
    return this.contactRepository.createContact(contact);
  }
}
