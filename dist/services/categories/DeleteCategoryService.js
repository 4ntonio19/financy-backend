"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryService = void 0;
const CategoryRepository_1 = require("../../repositories/CategoryRepository");
const handleError_1 = require("../../utils/handleError");
const repository = new CategoryRepository_1.CategoryRepository();
class DeleteCategoryService {
    async delete(id, user_id) {
        const categoryExist = await repository.getOne(id, user_id);
        if (!categoryExist)
            throw new handleError_1.HandleError(400, "Essa categoria não existe.");
        if (categoryExist?.transactions.length &&
            categoryExist?.transactions.length > 0)
            throw new handleError_1.HandleError(400, "Essa categoria possui transações.");
        await repository.deleteOne(id, user_id);
    }
}
exports.DeleteCategoryService = DeleteCategoryService;
