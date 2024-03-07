import { AppDataSource } from "../database/data-source";
import Category from "../models/Category";
import ICategory from "../types/Category";
const repository = AppDataSource.getRepository(Category);
class CategoryService {
  async getCategories(): Promise<ICategory[]> {
    const listCategories = await repository.find();
    if (!listCategories) throw new Error();
    return listCategories;
  }

  async getCategoriesByUserId(id: number): Promise<ICategory[]> {
    const listCategories = await repository.find({
      where: {
        user_id: {
          id: id,
        },
      },
    });
    if (!listCategories || listCategories.length === 0) throw new Error();

    return listCategories;
  }

  async postCategory(category: ICategory): Promise<ICategory> {
    category.createdAt = new Date();
    if (!category.user_id) throw new Error();
    return await repository.save(category);
  }
}

export default CategoryService;
