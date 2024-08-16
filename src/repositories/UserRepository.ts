import { PrismaClient } from "@prisma/client"
import { User, UserRequestBody } from "../entities/user"

const prisma = new PrismaClient()
export class UserRepository {
  async post({ name, email }: UserRequestBody): Promise<User> {
    const data = prisma.user.create({
      data: {
        name,
        email,
      },
    })
    return data
  }

  async getOneByEmail(email: string): Promise<User> {
    const data = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    })
    return data
  }

  async getOneById(id: string): Promise<User> {
    const data = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return data
  }
}
