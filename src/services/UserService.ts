import User from "../models/User";
import IUser from "../types/User";
import { AppDataSource } from "../database/data-source";
const repository = AppDataSource.getRepository(User);
export class UserService {
  constructor() {}

  async getUsers(): Promise<IUser[]> {
    const listUsers = await repository.find({
      relations: { categories: true, transactions: true },
    });
    if (!listUsers) throw new Error();
    const usersWithoutPass = listUsers.map((user) => ({
      ...user,
      password: undefined,
    }));
    return usersWithoutPass;
  }

  async getUserById(id: number): Promise<IUser> {
    const userDb = await repository.findOne({
      where: { id },
      relations: { categories: true, transactions: true },
    });
    if (!userDb) throw new Error();
    const userWithoutPass = {
      ...userDb,
      password: undefined,
    };
    return userWithoutPass;
  }

  async postUser(user: IUser): Promise<IUser> {
    user.createdAt = new Date();
    const userCreated = await repository.save(user);
    const userWithoutPass = {
      ...userCreated,
      password: undefined,
    };
    return userWithoutPass;
  }

  async updateUser(user: IUser, id: number) {
    const userDb = await repository.update(id, user);
    if (!userDb) throw new Error();
    return userDb;
  }

  async deleteUser(id: number): Promise<void> {
    await repository.delete(id);
  }
}
