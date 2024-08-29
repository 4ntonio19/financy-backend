"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TransactionRepository {
    async getAll(user_id, startDate, endDate) {
        const data = await prisma.transaction.findMany({
            where: {
                user_id,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            select: {
                id: true,
                title: true,
                date: true,
                value: true,
                type: true,
                category: {
                    select: {
                        color: true,
                        id: true,
                        title: true,
                    },
                },
            },
        });
        return data;
    }
    async getOneById(id, user_id) {
        const data = await prisma.transaction.findUnique({
            where: {
                id,
                user_id,
            },
            select: {
                id: true,
                title: true,
                date: true,
                type: true,
                value: true,
                category: {
                    select: {
                        id: true,
                        color: true,
                    },
                },
            },
        });
        return data;
    }
    async postOne(dto) {
        const data = prisma.transaction.create({
            data: {
                title: dto.title,
                date: new Date(dto.date),
                value: dto.value,
                type: dto.type,
                category_id: dto.category_id,
                user_id: dto.user_id,
            },
            include: {
                category: {
                    select: {
                        id: true,
                        color: true
                    }
                }
            }
        });
        return data;
    }
    async deleteOne(id, user_id) {
        await prisma.transaction.delete({
            where: {
                id,
                user_id
            }
        });
    }
}
exports.TransactionRepository = TransactionRepository;
