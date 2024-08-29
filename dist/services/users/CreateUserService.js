"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const UserRepository_1 = require("../../repositories/UserRepository");
const handleError_1 = require("../../utils/handleError");
const repository = new UserRepository_1.UserRepository();
class CreateUserService {
    async create({ name, email }) {
        const emailExist = await repository.getOneByEmail(email);
        if (emailExist)
            throw new handleError_1.HandleError(409, "Já existe uma conta vinculada a esse email.");
        const user = await repository.post({ name, email });
        return user.id;
    }
}
exports.CreateUserService = CreateUserService;
