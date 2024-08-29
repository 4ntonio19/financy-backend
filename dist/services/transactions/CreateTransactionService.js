"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionService = void 0;
const TransactionRepository_1 = require("../../repositories/TransactionRepository");
const repository = new TransactionRepository_1.TransactionRepository();
class CreateTransactionService {
    async create(dto) {
        const transactionCreated = await repository.postOne(dto);
        return transactionCreated.id;
    }
}
exports.CreateTransactionService = CreateTransactionService;
