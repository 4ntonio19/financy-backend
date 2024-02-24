import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
const app = express();

dotenv.config();

const PORT = 3000;
app.get('/', (req: Request, res:Response) => {

    res.json("A aplicação está ok")
})
app.listen(PORT, () => {console.log(`Servidor escutando na porta: ${PORT}`)
})