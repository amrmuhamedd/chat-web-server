import { Schema, Document, model } from "mongoose";
import { User } from "./user";

export interface ContactTypes {
  userId: User | string;
  contactId: User | string;
}

export class Contact {
  private userId: User | string;
  private contactId: User | string;

  constructor(input: ContactTypes) {
    this.userId = input.userId;
    this.contactId = input.contactId;
  }

  getUserId(): User | string {
    return this.userId;
  }

  toJSON(): ContactTypes {
    return {
      userId: this.userId,
      contactId: this.contactId,
    };
  }
}
