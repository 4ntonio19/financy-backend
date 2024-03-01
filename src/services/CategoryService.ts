import { AppDataSource } from "../database/data-source";
import Category from "../models/Category";
import ICategory from "../types/Category";
const categoryRepository = AppDataSource.getRepository(Category);
class CategoryService {
  async getCategories(): Promise<ICategory[]> {
    const listCategories = await categoryRepository.find({
      relations: { user_id: true, transactions: true },
    });
    if (!listCategories) throw new Error();

    return listCategories;
  }

  async postCategory(category: ICategory): Promise<ICategory> {
    category.createdAt = new Date();
    if (!category.user_id) throw new Error();
    return await categoryRepository.save(category);
  }
}

export default CategoryService;
