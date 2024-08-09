import express from "express"
const app = express()
import routes from "./routes"
const PORT = 3000

routes(app)
app.use(express.json())
app.listen(PORT, () => {
  console.log("Server listening on port 3000")
})
