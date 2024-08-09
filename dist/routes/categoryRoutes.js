"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("../controllers/category"));
const categoryRouter = (0, express_1.Router)();
const controller = new category_1.default();
categoryRouter.get('/category', (req, res) => {
    controller.list(req, res);
});
exports.default = categoryRouter;
