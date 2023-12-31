import express from "express";
import { ContactController } from "../controllers/contacts-controller";
import { MongoDBContactRepository } from "../../infrastructure/db/repository/contactRepository";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";

const contactRouter = express.Router();

const userRepository = new UserRepository();
const contactRepository = new MongoDBContactRepository();

const contactController = new ContactController(
  contactRepository,
  userRepository
);

contactRouter.post("/", contactController.addContact.bind(contactController));
contactRouter.get(
  "/:userId",
  contactController.getContacts.bind(contactController)
);

export { contactRouter };
