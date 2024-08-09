"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const handleError_1 = require("../utils/handleError");
const prisma = new client_1.PrismaClient();
class UserService {
    async post({ name, email }) {
        const emailExist = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (emailExist)
            throw new handleError_1.HandleError(409, "Já existe uma conta vinculada a esse email.");
        const user = prisma.user.create({
            data: {
                name,
                email,
            },
        });
        return (await user).id;
    }
    async getById(id) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                transactions: {
                    select: {
                        id: true,
                        title: true,
                        date: true,
                        value: true,
                        category_id: true,
                    },
                },
                categories: {
                    select: {
                        id: true,
                        title: true,
                        color: true,
                        icon: true,
                        transactions: {
                            select: {
                                id: true,
                                title: true,
                                date: true,
                                value: true,
                                category_id: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user)
            throw new handleError_1.HandleError(404, "Usuário não encontrado.");
        return user;
    }
}
exports.default = UserService;
