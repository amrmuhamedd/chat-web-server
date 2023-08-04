import { ContactRepository } from "@interfaces/data-access/contactRepository";
import { Contact } from "@entities/contact";

export class ListContactsByUserIdInteractor {
  private contactRepository: ContactRepository;

  constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  async listContactsByUserId(userId: string): Promise<Contact[]> {
    return this.contactRepository.listContactsByUserId(userId);
  }
}
