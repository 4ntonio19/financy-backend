"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError_1 = require("../utils/handleError");
const CreateCategoryService_1 = require("../services/categories/CreateCategoryService");
const ListCategoriesService_1 = require("../services/categories/ListCategoriesService");
const UpdateCategoryService_1 = require("../services/categories/UpdateCategoryService");
const DeleteCategoryService_1 = require("../services/categories/DeleteCategoryService");
class CategoryController {
    async list(req, res) {
        const service = new ListCategoriesService_1.ListCategoriesService();
        try {
            const { userId } = req.params;
            const type = req.query.type;
            if (!type)
                throw new handleError_1.HandleError(400, "O tipo da categoria não foi informado.");
            const categories = await service.findMany(userId, type?.toString());
            res.status(200).json(categories);
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
    async create(req, res) {
        const service = new CreateCategoryService_1.CreateCategoryService();
        try {
            const categoryId = await service.create(req.body);
            res.status(201).json({ id: categoryId });
        }
        catch (error) {
            if (error instanceof handleError_1.HandleError) {
                res.status(error.statusCode).json({ message: error.message });
            }
            else {
                res
                    .status(500)
                    .json({ message: "Ocorreu um erro ao criar a categoria." });
            }
        }
    }
    async edit(req, res) {
        const service = new UpdateCategoryService_1.UpdateCategoryService();
        try {
            const { id } = req.params;
            const categoryId = await service.update(id, req.body);
            res.status(200).json({ id: categoryId });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Ocorreu um erro ao editar a categoria." });
        }
    }
    async delete(req, res) {
        const service = new DeleteCategoryService_1.DeleteCategoryService();
        try {
            const { id, userId } = req.query;
            if (!id || !userId)
                throw new handleError_1.HandleError(400, "A categoria não foi informado.");
            await service.delete(id?.toString(), userId?.toString());
            res.status(200).json();
        }
        catch (error) {
            if (error instanceof handleError_1.HandleError) {
                res.status(error.statusCode).json({ message: error.message });
            }
            else {
                res
                    .status(500)
                    .json({ message: "Ocorreu um erro ao excluir a categoria." });
            }
        }
    }
}
exports.default = CategoryController;
