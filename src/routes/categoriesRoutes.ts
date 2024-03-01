import { Router } from "express";
import CategoryController from "../controllers/CategoryController";

const categoriesRouter = Router();
const categoryController = new CategoryController();

categoriesRouter.get("/categories", (req, res) =>
  categoryController.findAll(req, res)
);

categoriesRouter.post("/categories", (req, res) =>
  categoryController.createOne(req, res)
);

export default categoriesRouter;
