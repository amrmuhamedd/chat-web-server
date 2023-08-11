import { IUserRepository } from "../../interfaces/repository/userRepository";
import { comparePasswords, generateAuthToken } from "../../utils/auth";

export class LoginUserInteractor {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    try {
      const user = await this.userRepository.getUserByEmail(email);

      if (!user) {
        return "User not found";
      }

      const isPasswordValid = await comparePasswords(
        password,
        user.getPassword()
      );

      if (!isPasswordValid) {
        return "Invalid password";
      }

      const authToken = generateAuthToken(user);

      return authToken;
    } catch (error) {
      console.error("Error during user login:", error);
      return null;
    }
  }
}
