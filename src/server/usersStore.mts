import type { User, UserInfo } from "../api-interface";

export const users = new Map<number, User>();

export function getUser(id: number): UserInfo | undefined {
  const user = users.get(id);

  if (!user) {
    return;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export function addUser(user: User): UserInfo | undefined {
  const { name, email, password } = user;

  if (!name || !email || !password) {
    return;
  }

  user.id = users.size + 1;
  users.set(user.id, { id: user.id, name, email, password });

  console.log("addUser", { id: user.id, name, email, password });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export function updateUser(user: User): UserInfo | undefined {
  if (!user.id) {
    return;
  }
  const prevUser = users.get(user.id);

  if (!prevUser) {
    return;
  }

  console.log("updateUser", user);

  users.set(user.id, { ...prevUser, ...user });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export function deleteUser(id: number): UserInfo | undefined {
  const user = users.get(id);

  console.log("deleteUser", user);

  if (!user) {
    return;
  }

  users.delete(id);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export function changeUserPassword(
  id: number,
  oldPassword: string,
  newPassword: string
): boolean {
  const user = users.get(id);
  console.log("changeUserPassword", user, oldPassword, newPassword);

  if (user && user.password === oldPassword) {
    user.password = newPassword;
    return true;
  }

  return false;
}
