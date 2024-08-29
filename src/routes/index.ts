import express from 'express'
import userRouter from './userRoutes'
import categoryRouter from './categoryRoutes';
import transactionRouter from './transactionRoutes';

const routes = (app: express.Application) => {
    app.use(
        express.json(),
        userRouter,
        categoryRouter,
        transactionRouter
    )
} 


export default routes;