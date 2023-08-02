// src/adapters/mongodb-user-repository.ts
import { ToUser } from "@adapters/mapper/user";
import { User } from "@entities/user";
import { IUserRepository } from "../../interfaces/data-access/userRepository";
import { UserModel } from "../models/user";

export class UserRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    const createdUser = await UserModel.create(user);
    return ToUser(createdUser);
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await UserModel.findById(userId);
    return user ? ToUser(user) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user ? ToUser(user) : null;
  }

  async updateUser(user: User): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(user.getId(), user, {
      new: true,
    });
    return updatedUser ? ToUser(updatedUser) : null;
  }

  async deleteUser(userId: string): Promise<boolean> {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    return deletedUser ? true : false;
  }
}
