"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const handleError_1 = require("../utils/handleError");
const ListTransactionsService_1 = require("../services/transactions/ListTransactionsService");
const ListTransactionService_1 = require("../services/transactions/ListTransactionService");
const CreateTransactionService_1 = require("../services/transactions/CreateTransactionService");
const DeleteTransactionService_1 = require("../services/transactions/DeleteTransactionService");
class TransactionController {
    async list(req, res) {
        const service = new ListTransactionsService_1.ListTransactionListService();
        try {
            const { userId } = req.params;
            const { startDate, endDate } = req.query;
            if (!startDate || !endDate)
                throw new handleError_1.HandleError(400, "O período não foi informado.");
            const transactions = await service.findMany(userId, new Date(startDate?.toString()), new Date(endDate.toString()));
            res.status(200).json(transactions);
        }
        catch (error) {
            if (error instanceof handleError_1.HandleError) {
                res.status(error.statusCode).json({ message: error.message });
            }
            else {
                res
                    .status(500)
                    .json({ message: "Ocorreu um erro ao buscar as transações." });
            }
        }
    }
    async listOne(req, res) {
        const service = new ListTransactionService_1.ListTransactionService();
        try {
            const { id } = req.params;
            const { user_id } = req.query;
            if (!id || !user_id)
                throw new handleError_1.HandleError(403, "O id da transação não informado.");
            const transaction = await service.findOne(id?.toString(), user_id?.toString());
            res.status(200).json(transaction);
        }
        catch (error) {
            console.log(error);
            if (error instanceof handleError_1.HandleError) {
                res.status(error.statusCode).json({ message: error.message });
            }
            else {
                res
                    .status(500)
                    .json({ message: "Ocorreu um erro ao busca a transações." });
            }
        }
    }
    async create(req, res) {
        const service = new CreateTransactionService_1.CreateTransactionService();
        try {
            const userToPost = req.body;
            const transaction_id = await service.create(userToPost);
            res.status(201).json({ id: transaction_id });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ocorreu um erro ao criar a transação." });
        }
    }
    async delete(req, res) {
        const service = new DeleteTransactionService_1.DeleteTransactionService();
        try {
            const { id } = req.params;
            const { user_id } = req.query;
            if (!id || !user_id)
                throw new handleError_1.HandleError(403, "O id da transação não informado.");
            await service.delete(id, user_id.toString());
            res.status(200).json(null);
        }
        catch (error) {
            console.log(error);
            res
                .status(500)
                .json({ message: "Ocorreu um erro ao deletar a transação." });
        }
    }
}
exports.TransactionController = TransactionController;
