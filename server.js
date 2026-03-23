import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import reservationsRouter from './routes/reservations.js'
import contactRouter from './routes/contact.js'



dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/reservations', reservationsRouter)
app.use('/api/contact', contactRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Error al conectar a MongoDB:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => 
    console.log(`Servidor corriendo en puerto ${PORT}`))
