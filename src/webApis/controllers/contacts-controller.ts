import { Request, Response, NextFunction } from "express";
import { MongoDBContactRepository } from "../../infrastructure/db/repository/contactRepository";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { Contact } from "@app/core/domain/entities/contact";

export class ContactController {
  private contactRepository: MongoDBContactRepository;
  private userRepository: UserRepository;

  constructor(
    contactRepository: MongoDBContactRepository,
    userRepository: UserRepository
  ) {
    this.contactRepository = contactRepository;
    this.userRepository = userRepository;
  }

  async addContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, contactId } = req.body;

      // Check if the user and contact exist
      const user = await this.userRepository.getUserById(userId);
      const contact = await this.userRepository.getUserById(contactId);

      if (!user || !contact) {
        return res.status(404).json({ error: "User or contact not found" });
      }

      // Create a new contact
      const newContact = new Contact({ userId, contactId });
      await this.contactRepository.createContact(newContact);

      res.status(201).json({ message: "Contact added successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;

      // Get the user's contacts
      const contacts = await this.contactRepository.listContactsByUserId(
        userId
      );

      res.status(200).json(contacts);
    } catch (error) {
      next(error);
    }
  }
}
