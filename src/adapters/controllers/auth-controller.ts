// src/adapters/controllers/auth-controller.ts
import { Request, Response } from "express";
import { LoginUserInteractor } from "usecases/user/login";
import { RegisterUserInteractor } from "usecases/user/registerUserUseCase";

import { ToUser } from "@adapters/mapper/user";

export class AuthController {
  private loginUserInteractor: LoginUserInteractor;
  private registerUserInteractor: RegisterUserInteractor;

  constructor(
    loginUserInteractor: LoginUserInteractor,
    registerUserInteractor: RegisterUserInteractor
  ) {
    this.loginUserInteractor = loginUserInteractor;
    this.registerUserInteractor = registerUserInteractor;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const authToken = await this.loginUserInteractor.loginUser(
        email,
        password
      );

      if (!authToken) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      return res.status(200).json({ authToken });
    } catch (error) {
      console.error("Error during user login:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async register(req: Request, res: Response) {
    const userData = req.body;
    console.log("req", req.body);
    try {
      const newUser = await ToUser(userData);
      newUser.setPassword(userData.password);
      const registeredUser = await this.registerUserInteractor.registerUser(
        newUser
      );

      return res.status(201).json(registeredUser);
    } catch (error) {
      console.error("Error during user registration:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
