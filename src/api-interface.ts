type NewUser = {
  name: string;
  email: string;
  password: string;
};

type User = {
  id: number;
} & NewUser;

type UserInfo = Omit<User, "password">;

export interface API {
  getUsers(): Promise<User[]>;
  getUser({ id }: { id: number }): Promise<UserInfo>;
  createUser(user: NewUser): Promise<UserInfo>;
  updateUser(user: UserInfo): Promise<UserInfo>;
  deleteUser({ id }: { id: number }): Promise<UserInfo>;
  changeUserPassword({
    id,
    oldPassword,
    newPassword,
  }: {
    id: number;
    oldPassword: string;
    newPassword: string;
  }): Promise<boolean>;
}
