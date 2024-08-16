import { CategoryRequestBody, CategoryResponse } from "../entities/category";

export interface CreateCategoryModel {
    create: (dto:CategoryRequestBody) => Promise<string>
}
export interface ListCategoriesModel {
    findMany: (user_id: string, type: string) => Promise<CategoryResponse[]>
}
export interface UpdateCategoryModel {
    update: (id: string, dto: CategoryRequestBody) => Promise<string>
}
export interface DeleteCategoryModel {
    delete: (id: string, user_id: string) => Promise<void>
}