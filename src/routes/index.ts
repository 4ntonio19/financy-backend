import express from 'express'
import userRouter from './userRoutes'
import categoryRouter from './categoryRoutes';

const routes = (app: express.Application) => {
    app.use(
        express.json(),
        userRouter,
        categoryRouter
    )
} 


export default routes;