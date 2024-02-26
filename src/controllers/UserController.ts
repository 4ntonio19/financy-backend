import { Request, Response } from "express";
import { IUser } from "../types/User";
import { UserService } from "../services/UserService";

class UserController {
  constructor() {}
  async findAll(req: Request, res: Response) {
    const service = new UserService();
    try {
      const listUsers: IUser[] = await service.getUsers();
      return res.status(200).json(listUsers);
    } catch (error: any) {
      console.log(error);
      if (error.status === 404) {
        res
          .status(404)
          .json({ erro: "Não possuem dados para serem exibidos!" });
      } else {
        res.status(500).json({ erro: "Hove um erro no servidor." });
      }
    }
  }

  async findById(req: Request, res: Response) {
    const service = new UserService();
    try {
      const { id } = req.params;
      const user: IUser = await service.getUserById(Number(id));
      return res.status(200).json(user);
    } catch (error: any) {
      console.log(error);
      if (error.status === 404) {
        res
          .status(404)
          .json({ erro: "Não possuem dados para serem exibidos!" });
      } else {
        res.status(500).json({ erro: "Hove um erro no servidor." });
      }
    }
  }

  async createOne(req: Request, res: Response) {
    const service = new UserService();
    try {
      const object = req.body;
      const userCreated = await service.postUser(object);
      return res.status(201).json(userCreated);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar o usuário." });
    }
  }

  async updateOne(req: Request, res: Response) {
    const service = new UserService();
    try {
      const object = req.body;
      const { id } = req.params;
      const userUpdated = await service.updateUser(object, Number(id));
      return res.status(200).json(userUpdated);
    } catch (error: any) {
      if (error.status === 404) {
        res.status(404).json({ erro: "Usuário não encontrado." });
      } else {
        res.status(500).json({ erro: "Hove um erro no servidor." });
      }
    }
  }

  async removeOne(req: Request, res: Response) {
    const service = new UserService();
    try {
      const { id } = req.params;
      await service.deleteUser(Number(id));
      return res.status(200).json({ message: "Usuário excluído com sucesso." });
    } catch (error: any) {
      if (error.status === 404) {
        res.status(404).json({ erro: "Usuário não encontrado." });
      } else {
        res.status(500).json({ erro: "Hove um erro no servidor." });
      }
    }
  }
}

export default UserController;
