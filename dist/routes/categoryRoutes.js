"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const categoryRouter = (0, express_1.Router)();
const controller = new categoryController_1.default();
categoryRouter.get('/categories/:userId', (req, res) => {
    controller.list(req, res);
});
categoryRouter.post('/categories', (req, res) => {
    controller.create(req, res);
});
categoryRouter.delete('/categories', (req, res) => {
    controller.delete(req, res);
});
categoryRouter.put("/categories/:id", (req, res) => {
    controller.edit(req, res);
});
exports.default = categoryRouter;
