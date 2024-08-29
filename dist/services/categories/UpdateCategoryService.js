"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryService = void 0;
const CategoryRepository_1 = require("../../repositories/CategoryRepository");
const repository = new CategoryRepository_1.CategoryRepository();
class UpdateCategoryService {
    async update(id, dto) {
        const editCategory = await repository.putOne(id, dto);
        return editCategory.id;
    }
}
exports.UpdateCategoryService = UpdateCategoryService;
