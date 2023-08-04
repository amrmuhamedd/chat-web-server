import { AttachmentTypes, ImageTypes } from "@interfaces/common";
import { User } from "./user";

export class Message {
  private _id!: string;
  private text?: string;
  private time: string;
  private chatId: string;
  private meta: {
    receiver: string | User;
    sender: string | User;
    sent?: boolean;
    received?: boolean;
    read?: boolean;
    isForwarded?: boolean;
  };
  private attachments?: AttachmentTypes[];
  private image?: ImageTypes[];

  constructor(input: {
    text?: string;
    time: string;
    chatId: string;
    meta: {
      receiver: string | User;
      sender: string | User;
      sent?: boolean;
      received?: boolean;
      read?: boolean;
      isForwarded?: boolean;
    };
    attachments?: AttachmentTypes[];
    image?: ImageTypes[];
  }) {
    this.text = input.text;
    this.time = input.time;
    this.meta = input.meta;
    this.chatId = input.chatId;
    this.attachments = input.attachments;
    this.image = input.image;
  }

  getId() {
    return this._id;
  }
  setId(id: string) {
    this._id = id;
  }
  getText(): string | undefined {
    return this.text;
  }

  setText(text: string): void {
    this.text = text;
  }

  getTime(): string {
    return this.time;
  }

  getMeta(): {
    receiver?: string | User;
    sender?: string | User;
    sent?: boolean;
    received?: boolean;
    read?: boolean;
    isForwarded?: boolean;
  } {
    return this.meta;
  }

  getAttachments(): AttachmentTypes[] | undefined {
    return this.attachments;
  }

  getImage(): ImageTypes[] | undefined {
    return this.image;
  }

  toJSON(): any {
    return {
      _id: this._id,
      text: this.text,
      time: this.time,
      meta: this.meta,
      attachments: this.attachments,
      image: this.image,
    };
  }
}
