import { PrismaClient } from "@prisma/client"
import { userCredentialsModel, UserModel } from "../entities/user"
import { HandleError } from "../utils/handleError"
const prisma = new PrismaClient()

class UserService {
  async post({ name, email }: userCredentialsModel): Promise<string> {
    const emailExist = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (emailExist)
      throw new HandleError(409, "Já existe uma conta vinculada a esse email.")

    const user = prisma.user.create({
      data: {
        name,
        email,
      },
    })
    return (await user).id
  }

  async getById(id: string): Promise<UserModel> {
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
            type: true,
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
    })
    if (!user) throw new HandleError(404, "Usuário não encontrado.")
    return user
  }
}

export default UserService
