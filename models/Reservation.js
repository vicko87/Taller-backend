import mongoose from "mongoose";

// 1. Definimos el "esquema" — la estructura del documento
const reservationSchema = new mongoose.Schema({
    name:       { type: String, required: true }, // Nombre del cliente
    phone:     { type: String, required: true }, // Teléfono de contacto
    service:  { type: String, required: true }, // Servicio reservado
    date:     { type: Date, required: true }, // Fecha y hora de la reserva
    time:    { type: String, required: true }, // Hora de la reserva
    status:  { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' }, // Estado de la reserva (Pendiente, Confirmada, Cancelada)
}, { timestamps: true }) // Agrega campos createdAt y updatedAt automáticamente

// 2. Creamos el modelo a partir del esquema
//  "Reservation" → nombre de la colección en MongoDB será "reservations"
export default mongoose.model('Reservation', reservationSchema)