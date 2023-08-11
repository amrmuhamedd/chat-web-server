import { ContactRepository } from "core/application/interfaces/repository/contactRepository";
import { Contact } from "core/domain/entities/contact";

export class ListContactsByUserIdInteractor {
  private contactRepository: ContactRepository;

  constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  async listContactsByUserId(userId: string): Promise<Contact[]> {
    return this.contactRepository.listContactsByUserId(userId);
  }
}
