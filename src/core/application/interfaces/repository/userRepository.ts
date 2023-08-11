import { User } from "@app/core/domain/entities/user";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserById(userId: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(user: User): Promise<User | null>;
  deleteUser(userId: string): Promise<boolean>;
}
