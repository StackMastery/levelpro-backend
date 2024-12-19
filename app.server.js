import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mainRouter from './routes/main.routes.js'
import { dbConnect } from './db/dbConnection.js'

// Loading Dot Env In First
dotenv.config()

// Server PORT and App
const port = process.env.PORT || 3000
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

// Router
app.use(mainRouter)

// Databse Connection
dbConnect()

// Server Listen 
app.listen(port, () => {
    console.log(`\x1b[1m\x1b[32mServer Running In\x1b[0m \x1b[1m\x1b[34mhttp://localhost:${port}\x1b[0m`);
})