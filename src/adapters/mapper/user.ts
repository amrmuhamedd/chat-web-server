import { IUser } from "@interfaces/models/userModel";
import { User } from "@entities/user";

export const ToUser = (userDocument: IUser): User => {
  const { _id, firstName, lastName, username, email } = userDocument;

  const userEntity = new User({
    firstName,
    lastName,
    username,
    email,
  });
  if (userDocument.password) userEntity.setPassword(userDocument.password);
  userEntity.setId(_id?.toString());
  return userEntity;
};

export const toUsers = (userDocuments: IUser[]): User[] => {
  const usersArray = userDocuments.map(ToUser);
  return usersArray;
};
