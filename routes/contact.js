import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Crear mensaje
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: 'Mensaje enviado correctamente', contact })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    })

    // Obtener mensajes
    router.get('/', async (req, res) => {
        try {
            const contacts = await Contact.find().sort({ createdAt: -1 })
            res.json(contacts)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

export default router;