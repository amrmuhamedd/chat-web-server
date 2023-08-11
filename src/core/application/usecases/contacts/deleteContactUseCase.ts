import { ContactRepository } from "../../interfaces/repository/contactRepository";

export class DeleteContactInteractor {
  private contactRepository: ContactRepository;

  constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  async deleteContact(userId: string, contactId: string): Promise<boolean> {
    return this.contactRepository.deleteContact(userId, contactId);
  }
}
