import { Contact } from "@app/core/domain/entities/contact";
import { ContactRepository } from "../../interfaces/repository/contactRepository";

export class ListContactsByUserIdInteractor {
  private contactRepository: ContactRepository;

  constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  async listContactsByUserId(userId: string): Promise<Contact[]> {
    return this.contactRepository.listContactsByUserId(userId);
  }
}
