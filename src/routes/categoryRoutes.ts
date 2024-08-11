import { Request, Response, Router } from "express";
import CategoryController from "../controllers/category";

const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.get('/categories/:userId', (req:Request, res: Response) => {
    controller.list(req, res)
})

categoryRouter.post('/categories', (req: Request, res: Response) => {
    controller.create(req, res)
})

categoryRouter.delete('/categories', (req: Request, res: Response) => {
    controller.delete(req, res)
})

categoryRouter.put("/categories/:id", (req: Request, res: Response) => {
    controller.edit(req, res)
})

export default categoryRouter   