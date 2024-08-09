import { PrismaClient } from "@prisma/client"
import { CategoryModel } from "../entities/category"
import { HandleError } from "../utils/handleError"
const repository = new PrismaClient()
export default class CategoryService {
  async getAll(user_id: string): Promise<CategoryModel[]> {
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
    const AllNegativeCategories = categoryList.filter(
      (category) => category.type === false
    )
    const totalTransactions = AllNegativeCategories.flatMap(
      (category) => category.transactions
    ).reduce((acc, crr) => {
      return { value: acc.value + crr.value }
    })
    const categoriesWithPercent = AllNegativeCategories.map((category) => {
      const totalTransactionByCategory = category.transactions.reduce(
        (acc, crr) => {
          return { value: acc.value + crr.value }
        }
      )
      const percentageByCategory = (
        (totalTransactionByCategory.value * 100) /
        totalTransactions.value
      ).toFixed(2)
      
      const dto: CategoryModel = {
        id: category.id,
        title: category.title,
        color: category.color,
        icon: category.icon,
        type: category.type,
        percentage: percentageByCategory,
      }
      return dto
    })
    return categoriesWithPercent
  }
}
