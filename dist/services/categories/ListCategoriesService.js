"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesService = void 0;
const CategoryRepository_1 = require("../../repositories/CategoryRepository");
const handleError_1 = require("../../utils/handleError");
const repository = new CategoryRepository_1.CategoryRepository();
class ListCategoriesService {
    async findMany(user_id, type) {
        const categoryList = await repository.getAll(user_id);
        if (categoryList.length === 0)
            throw new handleError_1.HandleError(404, "Não há categorias para serem exibidas.");
        const totalValueExpensesTransactions = categoryList
            .flatMap((category) => {
            if (category.type === false)
                return category.transactions;
            return [];
        })
            .reduce((acc, crr) => {
            return { value: (acc ?? { value: 0 }).value + (crr?.value ?? 0) };
        }, { value: 0 });
        const totalValueIncomesTransactions = categoryList
            .flatMap((category) => {
            if (category.type === true)
                return category.transactions;
            return [];
        })
            .reduce((acc, crr) => {
            return { value: (acc ?? { value: 0 }).value + (crr?.value ?? 0) };
        }, { value: 0 });
        const categoriesWithPercent = categoryList
            .filter((category) => category.type.toString() === type)
            .map((category) => {
            let totalTransactionByCategory = { value: 0 };
            if (category.transactions.length > 0) {
                totalTransactionByCategory = category.transactions.reduce((acc, crr) => {
                    return { value: acc.value + crr.value };
                });
            }
            const totalToDivision = category.type === true
                ? totalValueIncomesTransactions
                : totalValueExpensesTransactions;
            const percentageByCategory = totalToDivision.value === 0
                ? 0
                : (totalTransactionByCategory.value * 100) / totalToDivision.value;
            const dto = {
                id: category.id,
                title: category.title,
                color: category.color,
                icon: category.icon,
                type: category.type,
                totalValue: totalTransactionByCategory.value,
                percentage: Math.round(percentageByCategory).toString(),
            };
            return dto;
        });
        return categoriesWithPercent;
    }
}
exports.ListCategoriesService = ListCategoriesService;
