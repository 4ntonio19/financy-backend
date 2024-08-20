import { PrismaClient } from "@prisma/client"
import { Transaction, TransactionRequestBody } from "../entities/transaction"
const prisma = new PrismaClient()
export class TransactionRepository {
  async getAll(
    user_id: string,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
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
          },
        },
      },
    })

    return data
  }

  async getOneById(
    id: string,
    user_id: string
  ): Promise<Transaction | null> {
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
    })

    return data
  }

  async postOne(dto: TransactionRequestBody): Promise<Transaction> {
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
    })
    return data
  } 

  async deleteOne(id: string, user_id:string): Promise<void> {
    await prisma.transaction.delete({
        where: {
            id,
            user_id
        }
    })
  }
}
