import { PrismaClient } from "@prisma/client"
import { CategoryModel, CategoryPostModel } from "../entities/category"
import { HandleError } from "../utils/handleError"
const repository = new PrismaClient()
export default class CategoryService {
  async getAll(user_id: string, type: string): Promise<CategoryModel[]> {
    const categoryList = await repository.category.findMany({
      where: {
        user_id,
      },
      include: {
        transactions: {
          select: { value: true },
        },
      },
    })

    if (categoryList.length === 0)
      throw new HandleError(404, "Não há categorias para serem exibidas.")
    const totalValueExpensesTransactions = categoryList
      .flatMap((category) => {
        if (category.type === false) return category.transactions
        return []
      })
      .reduce(
        (acc, crr) => {
          return { value: (acc ?? { value: 0 }).value + (crr?.value ?? 0) }
        },
        { value: 0 }
      )
    const totalValueIncomesTransactions = categoryList
      .flatMap((category) => {
        if (category.type === true) return category.transactions
        return []
      })
      .reduce(
        (acc, crr) => {
          return { value: (acc ?? { value: 0 }).value + (crr?.value ?? 0) }
        },
        { value: 0 }
      )
    const categoriesWithPercent = categoryList
      .filter((category) => category.type.toString() === type)
      .map((category) => {
        let totalTransactionByCategory = { value: 0 }
        if (category.transactions.length > 0) {
          totalTransactionByCategory = category.transactions.reduce(
            (acc, crr) => {
              return { value: acc.value + crr.value }
            }
          )
        }

        const totalToDivision =
          category.type === true
            ? totalValueIncomesTransactions
            : totalValueExpensesTransactions

        const percentageByCategory =
          totalToDivision.value === 0
            ? 0
            : (totalTransactionByCategory.value * 100) / totalToDivision.value

        const dto: CategoryModel = {
          id: category.id,
          title: category.title,
          color: category.color,
          icon: category.icon,
          type: category.type,
          totalValue: totalTransactionByCategory.value,
          percentage: Math.round(percentageByCategory).toString(),
        }

        return dto
      })

    return categoriesWithPercent
  }

  async postOne(dto: CategoryPostModel): Promise<string> {
    const categoryListByUser = await repository.category.findMany({
      where: {
        user_id: dto.user_id,
      },
    })

    const categoryExist = categoryListByUser.find(
      (category) => category.title.toLowerCase() === dto.title.toLowerCase()
    )
    if (categoryExist)
      throw new HandleError(400, "Já existe uma categoria com esse nome.")

    const categoryCreated = await repository.category.create({
      data: dto,
    })

    return categoryCreated.id
  }

  async putOne(id: string, dto: CategoryPostModel): Promise<string> {
    const editCategory = await repository.category.update({
      where: {
        id,
        user_id: dto.user_id
      },
      data: {
        title: dto.title,
        icon: dto.icon,
        color: dto.color,
        type: dto.type
      }
    })

    return editCategory.id
  }

  async deleteOne(id: string, user_id: string): Promise<void> {
    const categoryExist = await repository.category.findUnique({
      where: {
        id,
        user_id,
      },
      select: {
        transactions: true,
      },
    })

    if (
      categoryExist?.transactions.length &&
      categoryExist?.transactions.length > 0
    )
      throw new HandleError(400, "Essa categoria possui transações.")
    await repository.category.delete({
      where: {
        id,
        user_id,
      },
    })
  }
}
