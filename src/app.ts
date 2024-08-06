import { Prisma, PrismaClient } from "@prisma/client"
import { error, log } from "console"
import fastify from "fastify"

const server = fastify()

const prisma = new PrismaClient()
const teste = async () => {
  const users = await prisma.user.findMany()
  return users;
} 
server.get("/", (request, reply) => {
  teste().then(user => console.log(user)).catch(error => console.log(error))
  reply.send({ hello: "world" })
})

server.listen({ port: 3000 }, (err, address) => {
    if(err) {
        server.log.error(err)
        process.exit(1)
    }
    console.log(`server start on ${address}`);
    
})
