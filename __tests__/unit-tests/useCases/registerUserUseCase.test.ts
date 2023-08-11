import { IUserRepository } from "@app/core/application/interfaces/repository/userRepository";
import { RegisterUserInteractor } from "@app/core/application/usecases/user/registerUserUseCase";
import { User } from "@app/core/domain/entities/user";
import { UserRepository } from "@app/infrastructure/db/repository/userRepository";

jest.mock("@app/infrastructure/db/repository/userRepository");

describe("RegisterUserInteractor", () => {
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    // Create a mock instance of UserRepository
    userRepository = new UserRepository() as jest.Mocked<IUserRepository>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockHashPassword = jest.fn();

  it("should register a new user", async () => {
    const registerUserInteractor = new RegisterUserInteractor(userRepository);
    const userData = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
    });
    userData.setPassword("SomePassword");

    // Mock the getUserByEmail function to return null (user doesn't exist in the database)
    userRepository.getUserByEmail.mockResolvedValue(null);

    // Mock the hashPassword function to return the hashed password
    const hashedPassword = "HashedPassword";
    mockHashPassword.mockResolvedValue(hashedPassword);

    // Mock the createUser function to return the user with the _id property set
    const createdUserWithId = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
    });
    createdUserWithId.setPassword(hashedPassword);
    createdUserWithId.setId("SomeGeneratedId");
    userRepository.createUser.mockResolvedValue(createdUserWithId);

    const registeredUser = await registerUserInteractor.registerUser(userData);

    expect(registeredUser).toBeDefined();
    expect(registeredUser.getId()).toBe("SomeGeneratedId");
    expect(userRepository.getUserByEmail).toHaveBeenCalledTimes(1);
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
    expect(mockHashPassword).toHaveBeenCalledTimes(0);
    expect(userRepository.createUser).toHaveBeenCalledWith(userData);
    expect(userData.getPassword()).toBeDefined();
  });

  it("should not register an existing user", async () => {
    const registerUserInteractor = new RegisterUserInteractor(userRepository);

    const userData = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
    });
    userData.setPassword("SomePassword");

    // Mock the getUserByEmail function to return an existing user
    userRepository.getUserByEmail.mockResolvedValue(userData);

    await expect(
      registerUserInteractor.registerUser(userData)
    ).rejects.toThrowError("User registration failed");

    expect(userRepository.getUserByEmail).toHaveBeenCalledTimes(1);
    expect(userRepository.createUser).not.toHaveBeenCalled();
    expect(mockHashPassword).not.toHaveBeenCalled();
  });
});
