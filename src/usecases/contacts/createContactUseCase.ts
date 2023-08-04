import { ContactRepository } from "@interfaces/data-access/contactRepository";
import { Contact } from "@entities/contact";

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
