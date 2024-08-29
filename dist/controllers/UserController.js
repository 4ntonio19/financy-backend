"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const handleError_1 = require("../utils/handleError");
const CreateUserService_1 = require("../services/users/CreateUserService");
const ListUserById_1 = require("../services/users/ListUserById");
class UserController {
    async create(req, res) {
        const service = new CreateUserService_1.CreateUserService();
        try {
            const dto = req.body;
            const userId = await service.create(dto);
            res.status(201).json({ id: userId });
        }
        catch (error) {
            console.log(error);
            if (error instanceof handleError_1.HandleError) {
                res.status(error.statusCode).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: "Ocorreu um erro ao criar a conta." });
            }
        }
    }
    async listById(req, res) {
        const service = new ListUserById_1.ListUserById();
        try {
            const { id } = req.params;
            const user = await service.findById(id);
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
