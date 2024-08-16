import { CategoryRequestBody } from "../../entities/category"
import { UpdateCategoryModel } from "../../models/CategoryModels"
import { CategoryRepository } from "../../repositories/CategoriesRepository"

const repository = new CategoryRepository()
export class UpdateCategoryService implements UpdateCategoryModel {
  async update(id: string, dto: CategoryRequestBody): Promise<string> {
    const editCategory = await repository.putOne(id, dto)
    return editCategory.id
  }
}
