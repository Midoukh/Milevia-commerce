import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    id: String,
    role: String,
    name: String,
    email: String,
    password: String,
    orders: [String],
    gender: String,
    age: Number,
    profile: {
        avatar: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    roles: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role" 
        }
    ]
})

const User = mongoose.model('User', userSchema)

export default User