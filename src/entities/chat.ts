import { User } from "./user";
import { Message } from "./message";

export class Chat {
  private _id?: string;
  private participants: User[];
  private messages: Message[];

  constructor(input: {
    _id?: string;
    participants: User[];
    messages?: Message[];
  }) {
    this._id = input._id;
    this.participants = input.participants;
    this.messages = input.messages || [];
  }

  getId(): string | undefined {
    return this._id;
  }

  getParticipants(): User[] {
    return this.participants;
  }

  addParticipant(user: User): void {
    this.participants.push(user);
  }

  getMessages(): Message[] {
    return this.messages;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  toJSON(): any {
    return {
      _id: this._id,
      participants: this.participants.map((participant) =>
        participant.toJSON()
      ),
      messages: this.messages.map((message) => message.toJSON()),
    };
  }
}
