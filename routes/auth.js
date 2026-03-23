import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.post('/login', (req, res) => {
    const { user, pass } = req.body
    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
        res.json({ message: 'ok'})
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' })
    }
    
})

export default router