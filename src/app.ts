import express from "express"
import routes from "./routes"
import cors from "cors"
const app = express()
const PORT = 3000
app.use(cors())
routes(app)
app.listen(PORT, () => {
  console.log("Server listening on port 3000")
})
