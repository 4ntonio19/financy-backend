"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserById = void 0;
const UserRepository_1 = require("../../repositories/UserRepository");
const handleError_1 = require("../../utils/handleError");
const repository = new UserRepository_1.UserRepository();
class ListUserById {
    async findById(id) {
        const user = await repository.getOneById(id);
        if (!user)
            throw new handleError_1.HandleError(404, "Usuário não encontrado.");
        return user;
    }
}
exports.ListUserById = ListUserById;
