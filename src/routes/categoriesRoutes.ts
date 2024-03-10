import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
import authorization from "../middlewares/authorization";

const categoriesRouter = Router();
const categoryController = new CategoryController();

categoriesRouter.get("/categories", authorization, (req, res) =>
  categoryController.findAll(req, res)
);
categoriesRouter.get("/:id/categories", authorization, (req, res) =>
  categoryController.findByUserId(req, res)
);

categoriesRouter.post("/categories", authorization, (req, res) =>
  categoryController.createOne(req, res)
);

export default categoriesRouter;
