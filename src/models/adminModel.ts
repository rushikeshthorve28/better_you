import mongoose from "mongoose";

interface Iadmin {
    _id: string
    email: string
    name: string
    courses?: [mongoose.Schema.Types.ObjectId]
}

const adminSchema = new mongoose.Schema<Iadmin>({
    name: String,
    email: {
        type: String,
        unique: true
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
})

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema)

