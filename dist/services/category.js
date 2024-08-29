"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const handleError_1 = require("../utils/handleError");
const repository = new client_1.PrismaClient();
class CategoryService {
    async getAll(user_id) {
        const categoryList = await repository.category.findMany({
            where: {
                user_id,
            },
            include: {
                transactions: {
                    select: { value: true, type: true }
                }
            }
        });
        if (categoryList.length === 0)
            throw new handleError_1.HandleError(404, "Não há categorias para serem exibidas.");
        console.log(categoryList);
        const AllNegativeTransactions = categoryList.flatMap(category => category.transactions).filter(transaction => transaction.type === true);
        console.log(AllNegativeTransactions);
    }
}
exports.default = CategoryService;
