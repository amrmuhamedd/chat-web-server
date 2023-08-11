// user.test.ts

import { User } from "@app/core/domain/entities/user";

describe("User Entity", () => {
  it("should create a new user and return correct values", () => {
    const newUser = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
    });

    expect(newUser.getFirstName()).toBe("John");
    expect(newUser.getLastName()).toBe("Doe");
    expect(newUser.getEmail()).toBe("john.doe@example.com");
    expect(newUser.getUsername()).toBe("johndoe");
  });

  // Test for setter methods
  it("should update user properties correctly", () => {
    const newUser = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
    });

    newUser.setFirstName("Jane");
    newUser.setLastName("Smith");
    newUser.setEmail("jane.smith@example.com");
    newUser.setUsername("janesmith");

    expect(newUser.getFirstName()).toBe("Jane");
    expect(newUser.getLastName()).toBe("Smith");
    expect(newUser.getEmail()).toBe("jane.smith@example.com");
    expect(newUser.getUsername()).toBe("janesmith");
  });

  // Test for password setting and getting
  it("should set and get the password correctly", () => {
    const newUser = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
    });

    const hashedPassword = "SomeHashedPassword";
    newUser.setPassword(hashedPassword);

    expect(newUser.getPassword()).toBe(hashedPassword);
  });
});
