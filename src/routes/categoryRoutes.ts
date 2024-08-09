import { Request, Response, Router } from "express";
import CategoryController from "../controllers/category";

const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.get('/categories/:userId', (req:Request, res: Response) => {
    controller.list(req, res)
})

export default categoryRouter