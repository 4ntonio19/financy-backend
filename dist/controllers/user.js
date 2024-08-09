"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../services/user"));
const handleError_1 = require("../utils/handleError");
const service = new user_1.default();
class UserController {
    async create(req, res) {
        try {
            const dto = req.body;
            const userId = await service.post(dto);
            res.status(201).json({ id: userId });
        }
        catch (error) {
            if (error instanceof handleError_1.HandleError) {
                res.status(error.statusCode).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: "Ocorreu um erro ao criar a conta." });
            }
        }
    }
    async listById(req, res) {
        try {
            const { id } = req.params;
            const user = await service.getById(id);
            res.status(200).json(user);
        }
        catch (error) {
            if (error instanceof handleError_1.HandleError) {
                res.status(error.statusCode).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: "Ocorreu um erro ao buscar os dados." });
            }
        }
    }
}
exports.UserController = UserController;
exports.default = UserController;
