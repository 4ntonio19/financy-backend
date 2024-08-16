import { DeleteCategoryModel } from "../../models/CategoryModels";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { HandleError } from "../../utils/handleError";
const repository = new CategoryRepository()
export class DeleteCategoryService implements DeleteCategoryModel {
    async delete(id: string, user_id: string): Promise<void> {
        const categoryExist = await repository.getOne(id, user_id)
    
        if (
          categoryExist?.transactions.length &&
          categoryExist?.transactions.length > 0
        )
          throw new HandleError(400, "Essa categoria possui transações.")
        await repository.deleteOne(id, user_id)
      }
}