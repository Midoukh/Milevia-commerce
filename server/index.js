import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import authRoute from './routes/auth.routes.js'
import dotenv from 'dotenv'


dotenv.config()

const app = express()


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

//simple route


//route middlewares
app.use('/api/user', authRoute)


const PORT = process.env.PORT || 5000


mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log(`Server runnin at port${PORT}`)))
        .catch(error => console.log(error))