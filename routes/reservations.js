import express from 'express'
import Reservation from '../models/Reservation.js'

const router = express.Router()

// POST /api/reservations - Crear una nueva reserva
router.post('/', async (req, res) => {
    try {
        const reservation = new Reservation(req.body) // Crea una nueva instancia del modelo con los datos del cuerpo de la solicitud
        await reservation.save() // Guarda la reserva en la base de datos
        res.status(201).json({ message: 'Reserva guardada', reservation }) // Devuelve la reserva creada con un código de estado 201 (Created)
    } catch (err) {
        res.status(400).json({ message: 'Error al guardar la reserva', error: err.message }) // Devuelve un error con un código de estado 400 (Bad Request)
    }
})

// GET /api/reservations - Obtener todas las reservas
router.get('/', async (req, res) => {
    try {
        const reservations = (await Reservation.find().sort({ createdAt: -1 })) // Busca todas las reservas en la base de datos y las ordena por fecha de creación descendente
        res.json(reservations) // Devuelve las reservas encontradas
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las reservas', error: err.message }) // Devuelve un error con un código de estado 500 (Internal Server Error)
    }
})

// PATCH /api/reservations/:id — actualizar estado de reserva
router.patch('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status }, // Actualiza solo el campo de estado
            { new: true } // Devuelve el documento actualizado
        )
        res.json(reservation) // Devuelve la reserva actualizada
    } catch (err) {
        res.status(400).json({ error: err.message }) // Devuelve un error con un código de estado 400 (Bad Request)
    }
})

// DELETE /api/reservations/:id - Eliminar una reserva
router.delete('/:id', async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id) // Elimina la reserva con el ID especificado
        res.json({ message: 'Reserva eliminada' }) // Devuelve un mensaje de éxito
    } catch (err) {
        res.status(400).json({ error: err.message }) // Devuelve un error con un código de estado 400 (Bad Request)
    }
})

export default router