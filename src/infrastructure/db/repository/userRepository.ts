// src/adapters/mongodb-user-repository.ts

import { User } from "@app/core/domain/entities/user";
import { UserModel } from "../models/user";

import { IUserRepository } from "core/application/interfaces/repository/userRepository";
import { ToUser } from "../mapper/user";

export class UserRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    const createdUser = await UserModel.create(user);
    return ToUser(createdUser);
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await UserModel.findById(userId).select("-password");
    return user ? ToUser(user) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user ? ToUser(user) : null;
  }

  async updateUser(user: User): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(user.getId(), user, {
      new: true,
    }).select("-password");
    return updatedUser ? ToUser(updatedUser) : null;
  }

  async deleteUser(userId: string): Promise<boolean> {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    return deletedUser ? true : false;
  }
}
