import express, { Request, Response } from 'express';

const app = express();

const PORT = 3000;

app.get('/', (req: Request, res:Response) => {
    res.json("A aplicação está ok")
})
app.listen(PORT, () => {console.log(`Servidor escutando na porta: ${PORT}`)
})