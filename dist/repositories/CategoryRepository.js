"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryRepository {
    async getAll(user_id) {
        const data = await prisma.category.findMany({
            where: {
                user_id,
            },
            include: {
                transactions: {
                    select: { value: true },
                },
            },
        });
        return data;
    }
    async getOne(id, user_id) {
        const data = await prisma.category.findUnique({
            where: {
                id,
                user_id,
            },
            include: {
                transactions: true
            }
        });
        if (!data)
            return null;
        return data;
    }
    async postOne(dto) {
        const data = await prisma.category.create({
            data: dto,
            include: {
                transactions: true,
            },
        });
        return data;
    }
    async putOne(id, dto) {
        const data = await prisma.category.update({
            where: {
                id,
                user_id: dto.user_id,
            },
            data: {
                title: dto.title,
                icon: dto.icon,
                color: dto.color,
                type: dto.type,
            },
            include: {
                transactions: true,
            },
        });
        return data;
    }
    async deleteOne(id, user_id) {
        await prisma.category.delete({
            where: {
                id,
                user_id,
            },
        });
    }
}
exports.CategoryRepository = CategoryRepository;
