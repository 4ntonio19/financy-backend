import { PrismaClient } from "@prisma/client"
import { Category, CategoryRequestBody } from "../entities/category"
const prisma = new PrismaClient()

export class CategoryRepository {
  public async getAll(user_id: string): Promise<Category[]> {
    const data = await prisma.category.findMany({
      where: {
        user_id,
      },
      include: {
        transactions: {
          select: { value: true },
        },
      },
    })

    return data
  }

  public async getOne(id: string, user_id: string): Promise<Category | null> {
    const data = await prisma.category.findUnique({
      where: {
        id,
        user_id,
      },
      include: {
        transactions: true
      }
    })
    if(!data) return null
    return data
  }

  public async postOne(dto: CategoryRequestBody): Promise<Category> {
    const data = await prisma.category.create({
      data: dto,
      include: {
        transactions: true,
      },
    })
    return data
  }

  public async putOne(
    id: string,
    dto: CategoryRequestBody
  ): Promise<Category> {
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
    })
    return data
  }

  public async deleteOne(id: string, user_id: string): Promise<void> {
    await prisma.category.delete({
      where: {
        id,
        user_id,
      },
    })
  }
}
