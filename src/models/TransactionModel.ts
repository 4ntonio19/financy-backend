import { Transaction, TransactionRequestBody } from "../entities/transaction"

export interface ListTransactionsModel {
  findMany: (
    user_id: string,
    startDate: Date,
    endDate: Date
  ) => Promise<Transaction[]>
}

export interface ListTransactionModel {
    findOne: (id: string, user_id: string) => Promise<Transaction>
}

export interface CreateTransactionModel {
  create: (dto: TransactionRequestBody) => Promise<string>
}

export interface UpdateTransactionModel {
  update: (dto: TransactionRequestBody) => Promise<string>
}

export interface DeleteTransactionModel {
  delete: (id: string, user_Id: string) => Promise<void>
}
