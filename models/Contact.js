import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true })

// 2. Creamos el modelo a partir del esquema
//  "Contact" → nombre de la colección en MongoDB será "contacts"
export default mongoose.model('Contact', contactSchema)