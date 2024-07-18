import mongoose, { Connection } from "mongoose";

let cachedDb: Connection | null = null;

export async function connectToDatabase() {
    try {
        if (cachedDb) {
            console.log('db already connected');
            return { db: cachedDb };
        }

        await mongoose.connect(process.env.MONGODB_URL!);
        const db: Connection = mongoose.connection;
        cachedDb = db;
        console.log('db connected successfully');

        return { db };
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; // rethrow the error to handle it elsewhere if needed
    }
}
