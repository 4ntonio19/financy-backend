import { Request, Response } from "express"
import CategoryService from "../services/category"
import { HandleError } from "../utils/handleError"
const service = new CategoryService()
export default class CategoryController {
  async list(req: Request, res: Response) {
    try {
      const { userId } = req.params
      const categories = await service.getAll(userId)
      res.status(200).json(categories)
    } catch (error) {
      if (error instanceof HandleError) {
        res.status(error.statusCode).json({ message: error.message })
      } else {
        res.status(500).json({ message: "Ocorreu um erro ao buscar os dados." })
      }
    }
  }
}
