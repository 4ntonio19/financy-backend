"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async post({ name, email }) {
        const data = prisma.user.create({
            data: {
                name,
                email,
            },
        });
        return data;
    }
    async getOneByEmail(email) {
        const data = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!data)
            return null;
        return data;
    }
    async getOneById(id) {
        const data = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!data)
            return null;
        return data;
    }
}
exports.UserRepository = UserRepository;
