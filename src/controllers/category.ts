import { Request, Response } from "express"
import CategoryService from "../services/category"
import { HandleError } from "../utils/handleError"
const service = new CategoryService()
export default class CategoryController {
  async list(req: Request, res: Response) {
    try {
      const { userId } = req.params
      const type = req.query.type
      if (!type)
        throw new HandleError(400, "O tipo da categoria não foi informado.")
      const categories = await service.getAll(userId, type?.toString())
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
    try {
      const categoryId = await service.postOne(req.body)
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
    try {
      const { id } = req.params
      const categoryId = await service.putOne(id, req.body)
      res.status(200).json({ id: categoryId })
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao editar a categoria." })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id, userId } = req.query
      if (!id || !userId)
        throw new HandleError(400, "A categoria não foi informado.")
      await service.deleteOne(id?.toString(), userId?.toString())
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
