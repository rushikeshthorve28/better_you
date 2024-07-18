import mongoose, { Schema, model } from "mongoose";

interface Iuser {
    _id: string
    name: string
    email: string
    courses?: [Schema.Types.ObjectId]
    cart?: [Schema.Types.ObjectId]
}

const userSchema = new Schema<Iuser>({
    name: String,
    email: {
        type: String,
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
})

export const User = mongoose.models.User || model('User', userSchema)