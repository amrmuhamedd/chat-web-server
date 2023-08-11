import { IUser } from "@app/core/application/interfaces/models/userModel";
import { User } from "@app/core/domain/entities/user";

export const ToUser = (userDocument: IUser): User => {
  const { _id, firstName, lastName, username, email, meta, profileImage } =
    userDocument;

  const userEntity = new User({
    firstName,
    lastName,
    username,
    email,
    meta,
    profileImage,
  });
  if (userDocument.password) userEntity.setPassword(userDocument.password);
  userEntity.setId(_id?.toString());
  return userEntity;
};

export const toUsers = (userDocuments: IUser[]): User[] => {
  const usersArray = userDocuments.map(ToUser);
  return usersArray;
};
