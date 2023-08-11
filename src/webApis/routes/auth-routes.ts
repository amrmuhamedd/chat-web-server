// src/adapters/routes/auth-routes.ts
import { LoginUserInteractor } from "core/application/usecases/user/login";
import { RegisterUserInteractor } from "core/application/usecases/user/registerUserUseCase";
import { Router } from "express";

import { UserRepository } from "infrastructure/db/repository/userRepository";
import { AuthController } from "webApis/controllers/auth-controller";

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
