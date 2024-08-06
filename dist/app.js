"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)();
const prisma = new client_1.PrismaClient();
const teste = async () => {
    const users = await prisma.user.findMany();
    return users;
};
server.get("/", (request, reply) => {
    teste().then(user => console.log(user)).catch(error => console.log(error));
    reply.send({ hello: "world" });
});
server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    console.log(`server start on ${address}`);
});
