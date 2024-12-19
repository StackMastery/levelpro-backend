import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlegth: 70
        },
        username:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address',
            ],
        },
        isActive:{
            type: Boolean,
        },
        passion:{
            type: String, 
            required: true
        },
        avatar: {
            type: String,
        },
    },
    {timestamps: true},
)

const UserModel = mongoose.model('user', UserSchema)

export {UserModel}