import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    id: String,
    gender: String,
    category: String,
    product_name: String,
    description: String,
    prix: String,
    orders: [String],
    gender: String,
    age: Number,
    media: {
        image: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const product = mongoose.model('productSchema', productSchema)

export default product