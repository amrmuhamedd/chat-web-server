import { Types } from "mongoose";
import { STATUS_TYPES } from "@interfaces/common";

export class User {
  private _id!: string;
  private firstName: string;
  private lastName: string;
  private username: string;
  private email: string;
  private password!: string;
  private profileImage?: any;
  private status?: STATUS_TYPES;
  private meta?: {
    unRead?: number;
    status?: STATUS_TYPES;
  };

  constructor(input: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  }) {
    const { firstName, lastName, email, username } = input;
    this.firstName = firstName;
    this.email = email;
    this.lastName = lastName;
    this.username = username;
  }

  getId() {
    return this._id;
  }

  setId(id: string) {
    this._id = id;
  }

  getUsername() {
    return this.username;
  }

  setUsername(username: string) {
    this.username = username;
  }

  getFirstName() {
    return this.firstName;
  }

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  getLastName() {
    return this.lastName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  getEmail() {
    return this.email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getPassword() {
    return this.password;
  }
  setEmail(email: string) {
    this.email = email;
  }

  getProfileImage() {
    return this.profileImage;
  }

  setProfileImage(profileImage: any) {
    this.profileImage = profileImage;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: STATUS_TYPES) {
    this.status = status;
  }

  getMeta() {
    return this.meta;
  }

  setMeta(meta: { unRead?: number; status?: STATUS_TYPES }) {
    this.meta = meta;
  }
}
