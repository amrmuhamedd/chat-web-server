// src/adapters/routes/auth-routes.ts
import { Router } from "express";
import { AuthController } from "@adapters/controllers/auth-controller";
import { LoginUserInteractor } from "usecases/user/login";
import { RegisterUserInteractor } from "usecases/user/registerUserUseCase";
import { UserRepository } from "@adapters/repository/userRepository";

export function authRoutes(router: Router) {
  const userRepository = new UserRepository(); // Initialize the userRepository with the appropriate implementation.
  const loginUserInteractor = new LoginUserInteractor(userRepository);
  const registerUserInteractor = new RegisterUserInteractor(userRepository);

  const authController = new AuthController(
    loginUserInteractor,
    registerUserInteractor
  );

  router.post("/login", authController.login.bind(authController));

  router.post("/register", authController.register.bind(authController));
}
