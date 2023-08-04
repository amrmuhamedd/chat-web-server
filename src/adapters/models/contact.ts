import { IContact } from "@interfaces/models/contact";
import mongoose, { Schema } from "mongoose";

const contactSchema = new mongoose.Schema<IContact>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  contactId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  addedAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", contactSchema);

export { ContactModel };
