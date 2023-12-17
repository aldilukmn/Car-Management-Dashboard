import env from 'dotenv'
import express from 'express'
import router from './routes/routers'
import path from 'path'
import expressLayout from 'express-ejs-layouts'
import cors from 'cors'
import cookieParse from 'cookie-parser'
const app = express()
env.config()

const publicDirectory = path.join(__dirname, '../public')

app.use(express.static(publicDirectory))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(expressLayout)
app.use(cors())
app.use(cookieParse())

app.use('/api', router)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/api/v1/cars`)
})
