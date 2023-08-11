// src/usecases/register-user-interactor.ts

import { IUserRepository } from "core/application/interfaces/repository/userRepository";
import { hashPassword } from "core/application/utils/auth";
import { User } from "core/domain/entities/user";

export class RegisterUserInteractor {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(userData: User): Promise<User> {
    try {
      const existingUser = await this.userRepository.getUserByEmail(
        userData.getEmail()
      );

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await hashPassword(userData.getPassword());
      userData.setPassword(hashedPassword);

      const createdUser = await this.userRepository.createUser(userData);

      return createdUser;
    } catch (error) {
      throw new Error("User registration failed");
    }
  }
}
