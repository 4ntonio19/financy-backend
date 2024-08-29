import { Request, Response } from "express"
import { HandleError } from "../utils/handleError"
import { CreateCategoryService } from "../services/categories/CreateCategoryService"
import { ListCategoriesService } from "../services/categories/ListCategoriesService"
import { UpdateCategoryService } from "../services/categories/UpdateCategoryService"
import { DeleteCategoryService } from "../services/categories/DeleteCategoryService"
export default class CategoryController {
  async list(req: Request, res: Response) {
    const service = new ListCategoriesService()
    try {
      const { userId } = req.params
      const type = req.query.type
      if (!type)
        throw new HandleError(400, "O tipo da categoria não foi informado.")
      const categories = await service.findMany(userId, type?.toString())
      res.status(200).json(categories)
    } catch (error) {
      if (error instanceof HandleError) {
        res.status(error.statusCode).json({ message: error.message })
      } else {
        res.status(500).json({ message: "Ocorreu um erro ao buscar os dados." })
      }
    }
  }

  async create(req: Request, res: Response) {
    const service = new CreateCategoryService()
    try {
      const categoryId = await service.create(req.body)
      res.status(201).json({ id: categoryId })
    } catch (error) {
      if (error instanceof HandleError) {
        res.status(error.statusCode).json({ message: error.message })
      } else {
        res
          .status(500)
          .json({ message: "Ocorreu um erro ao criar a categoria." })
      }
    }
  }

  async edit(req: Request, res: Response) {
    const service = new UpdateCategoryService()
    try {
      const { id } = req.params
      const categoryId = await service.update(id, req.body)
      res.status(200).json({ id: categoryId })
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao editar a categoria." })
    }
  }

  async delete(req: Request, res: Response) {
    const service = new DeleteCategoryService()
    try {
      const { id, userId } = req.query
      if (!id || !userId)
        throw new HandleError(400, "A categoria não foi informado.")
      await service.delete(id?.toString(), userId?.toString())
      res.status(200).json()
    } catch (error) {
      if (error instanceof HandleError) {
        res.status(error.statusCode).json({ message: error.message })
      } else {
        res
          .status(500)
          .json({ message: "Ocorreu um erro ao excluir a categoria." })
      }
    }
  }
}
