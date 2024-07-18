import mongoose, { Schema, model } from "mongoose";
import { string } from "zod";

interface Icoures {
    _id: string
    admin_id: mongoose.Schema.Types.ObjectId
    title: string
    description: string
    image: string
    price: string
    category: string
}

const courseSchema = new Schema<Icoures>({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String
    }
})

export const Course = mongoose.models.Course || model('Course', courseSchema)
