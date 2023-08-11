import { User } from "./user";
import { Message } from "./message";

export class Chat {
  private _id!: string;
  private participants: User[];
  private messages: Message[];

  constructor(input: { participants: User[]; messages?: Message[] }) {
    this.participants = input.participants;
    this.messages = input.messages || [];
  }

  getId(): string {
    return this._id;
  }
  setId(id: string) {
    this._id = id;
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
