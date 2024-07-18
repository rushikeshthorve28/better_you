import mongoose from "mongoose";

export interface courses {
    title: string,
    description: string,
    image: string,
    price: string,
    admin_id?: mongoose.Schema.Types.ObjectId 
}