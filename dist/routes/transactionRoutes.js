"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_1 = require("../controllers/transaction");
const transactionRouter = (0, express_1.Router)();
const controller = new transaction_1.TransactionController();
transactionRouter.get('/transactions/:user_Id', (req, res) => {
    controller.list(req, res);
});
transactionRouter.get('/transaction/:id', (req, res) => {
    controller.listOne(req, res);
});
transactionRouter.post('/transactions', (req, res) => {
    controller.create(req, res);
});
transactionRouter.delete('/transactions/:id', (req, res) => {
    controller.delete(req, res);
});
exports.default = transactionRouter;
