"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryService = void 0;
const CategoryRepository_1 = require("../../repositories/CategoryRepository");
const handleError_1 = require("../../utils/handleError");
const repository = new CategoryRepository_1.CategoryRepository();
class CreateCategoryService {
    async create(dto) {
        const categoryListByUser = await repository.getAll(dto.user_id);
        const categoryExist = categoryListByUser.find((category) => category.title.toLowerCase() === dto.title.toLowerCase());
        if (categoryExist)
            throw new handleError_1.HandleError(400, "Já existe uma categoria com esse nome.");
        const categoryCreated = await repository.postOne(dto);
        return categoryCreated.id;
    }
}
exports.CreateCategoryService = CreateCategoryService;
