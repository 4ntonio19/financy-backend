import { IUser } from "../types/User";
import User from "../entities/User";
import { AppDataSource } from "../database/data-source";
const userRepository = AppDataSource.getRepository(User);
export class UserService {
  constructor() {}

  async getUsers(): Promise<IUser[]> {
    const listUsers = await userRepository.find();
    if (!listUsers) {
      throw new Error();
    }
    return listUsers;
  }

  async getUserById(id: number): Promise<IUser> {
    const userDb = await userRepository.findOne({ where: { id } });
    if (!userDb) {
      throw new Error();
    }
    return userDb;
  }

  async postUser(user: IUser): Promise<IUser> {
    user.createdAt = new Date();
    return await userRepository.save(user);
  }

  async updateUser(user: IUser, id: number) {
    const userDb = await userRepository.update(id, user);
    if (!userDb) {
      throw new Error();
    }
    return userDb;
  }

  async deleteUser(id: number): Promise<void> {
    await userRepository.delete(id);
  }
}
