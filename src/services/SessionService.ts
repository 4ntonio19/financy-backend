import { AppDataSource } from "../database/data-source";
import User from "../models/User";
import { sign } from "jsonwebtoken";
import IUserSession from "../types/Session";
const userRepository = AppDataSource.getRepository(User);
const secret_key = process.env.SECRET_KEY as string;
export default class SessionService {
  async createSession(email: string, pwd: string): Promise<IUserSession> {
    if (!email || !pwd) throw new Error("Email e senha são obrigatórios.");

    const findUser = await userRepository.findOne({
      where: {
        email: email,
        password: pwd,
      },
    });

    if (!findUser) throw new Error("Usuário não encontrado.");

    const sessionObject = {
      id: findUser.id,
      name: findUser.fullName,
      email: findUser.email,
      token: this.createToken(email),
    };
    return sessionObject;
  }

  createToken(email: string) {
    const token = sign({ email }, secret_key, {
      algorithm: "HS512",
      expiresIn: "1h",
    });
    return token;
  }
}
