import { Request, Response } from "express";
import TransactionService from "../services/TransactionService";
import ITransaction from "../types/Transaction";

class TransactionController {
  async findAll(req: Request, res: Response) {
    const service = new TransactionService();
    try {
      const listTransactions: ITransaction[] = await service.getTransactions();
      return res.status(200).json(listTransactions);
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

  async findByUserId(req: Request, res: Response) {
    const service = new TransactionService();
    try {
      const { id } = req.params;
      const listTransactions: ITransaction[] =
        await service.getTransactionsByUserId(Number(id));
      res.status(200).json(listTransactions);
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
    const service = new TransactionService();
    try {
      const object = req.body;
      const transactionCreated = await service.postTransaction(object);
      return res.status(201).json(transactionCreated);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar a transação." });
    }
  }
}

export default TransactionController;
