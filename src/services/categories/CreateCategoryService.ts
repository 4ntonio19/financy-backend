import { CategoryRequestBody } from "../../entities/category"
import { CreateCategoryModel } from "../../models/CategoryModels"
import { CategoryRepository } from "../../repositories/CategoriesRepository"
import { HandleError } from "../../utils/handleError"
const repository = new CategoryRepository()
export class CreateCategoryService implements CreateCategoryModel {
  async create(dto: CategoryRequestBody): Promise<string> {
    const categoryListByUser = await repository.getAll(dto.user_id)

    const categoryExist = categoryListByUser.find(
      (category) => category.title.toLowerCase() === dto.title.toLowerCase()
    )
    if (categoryExist)
      throw new HandleError(400, "Já existe uma categoria com esse nome.")

    const categoryCreated = await repository.postOne(dto)

    return categoryCreated.id
  }
}
