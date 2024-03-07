import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import ICategory from "../types/Category";

class CategoryController {
  async findAll(req: Request, res: Response) {
    const service = new CategoryService();
    try {
      const list: ICategory[] = await service.getCategories();
      return res.status(200).json(list);
    } catch (error: any) {
      console.log(error);
      if (error.status === 404) {
        res
          .status(404)
          .json({ erro: "Não possuem dados para serem exibidos!" });
      } else {
        res.status(500).json({ erro: "Hove um erro no servidor." });
      }
    }
  }
  async findByUserId(req: Request, res: Response) {
    const service = new CategoryService();
    try {
      const { id } = req.params;
      const list: ICategory[] = await service.getCategoriesByUserId(Number(id));
      return res.status(200).json(list);
    } catch (error: any) {
      console.log(error);
      if (error.status === 404) {
        res
          .status(404)
          .json({ erro: "Não possuem dados para serem exibidos!" });
      } else {
        res.status(500).json({ erro: "Hove um erro no servidor." });
      }
    }
  }

  async createOne(req: Request, res: Response) {
    const service = new CategoryService();
    try {
      const object = req.body;
      const categoryCreated: ICategory = await service.postCategory(object);
      res.status(201).json(categoryCreated);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar a categoria." });
    }
  }
}

export default CategoryController;
