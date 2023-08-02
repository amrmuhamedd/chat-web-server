import { UserRepository } from "@adapters/repository/userRepository";
import { User } from "@entities/user";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

describe("UserRepository", () => {
  let mongoServer: MongoMemoryServer;
  let userRepository: UserRepository;

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = await mongoServer.getUri();

    await mongoose.connect(mongoUri, {});

    userRepository = new UserRepository();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  it("should create a new user", async () => {
    const newUser = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "amr",
    });
    newUser.setPassword("SomeHashedPassword");
    const createdUser = await userRepository.createUser(newUser);
    expect(createdUser).toBeDefined();
    expect(createdUser?.getId).toBeDefined();
    expect(createdUser.getFirstName()).toBe(newUser.getFirstName());
    expect(createdUser.getLastName()).toBe(newUser.getLastName());
    expect(createdUser.getEmail()).toBe(newUser.getEmail());
  });
  it("should get a user by id", async () => {
    const newUser = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "amr",
    });
    newUser.setPassword("SomeHashedPassword");
    const createdUser = await userRepository.createUser(newUser);

    const fetchedUser = await userRepository.getUserById(
      createdUser.getId().toString()
    );

    expect(fetchedUser).toBeDefined();

    expect(fetchedUser?.getFirstName()).toBe(createdUser.getFirstName());
    expect(fetchedUser?.getLastName()).toBe(createdUser.getLastName());
    expect(fetchedUser?.getEmail()).toBe(createdUser.getEmail());
  });
  it("should get a user by email", async () => {
    const newUser = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "amr",
    });
    newUser.setPassword("SomeHashedPassword");
    const createdUser = await userRepository.createUser(newUser);

    const fetchedUserByEmail = await userRepository.getUserByEmail(
      newUser.getEmail()
    );

    expect(fetchedUserByEmail).toBeDefined();
    expect(fetchedUserByEmail?.getId()).toBeDefined();
    expect(fetchedUserByEmail?.getFirstName()).toBe(createdUser.getFirstName());
    expect(fetchedUserByEmail?.getLastName()).toBe(createdUser.getLastName());
    expect(fetchedUserByEmail?.getEmail()).toBe(createdUser.getEmail());
  });

  it("should update a user", async () => {
    const newUser = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "amr",
    });
    newUser.setPassword("SomeHashedPassword");
    const createdUser = await userRepository.createUser(newUser);

    createdUser.setFirstName("amr");
    createdUser.setLastName("mohamed");
    createdUser.setEmail("amr@test.com");
    const updatedResult = await userRepository.updateUser(createdUser);

    expect(updatedResult).toBeDefined();
    expect(updatedResult?.getId()).toBeDefined();
    expect(updatedResult?.getFirstName()).toBe("amr");
    expect(updatedResult?.getLastName()).toBe("mohamed");
    expect(updatedResult?.getEmail()).toBe("amr@test.com");

    const fetchedUser = await userRepository.getUserById(
      createdUser.getId().toString()
    );
    expect(fetchedUser).toBeDefined();
    expect(fetchedUser?.getId()).toBeDefined();
    expect(fetchedUser?.getFirstName()).toBe("amr");
    expect(fetchedUser?.getLastName()).toBe("mohamed");
    expect(fetchedUser?.getEmail()).toBe("amr@test.com");
  });

  it("should delete a user", async () => {
    const newUser = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "amr",
    });
    newUser.setPassword("SomeHashedPassword");
    const createdUser = await userRepository.createUser(newUser);

    const deleteResult = await userRepository.deleteUser(
      createdUser.getId().toString()
    );

    expect(deleteResult).toBeTruthy();

    const fetchedUser = await userRepository.getUserById(
      createdUser.getId().toString()
    );
    expect(fetchedUser).toBeNull();
  });
});
