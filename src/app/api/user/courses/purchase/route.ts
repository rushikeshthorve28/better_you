import { connectToDatabase } from "@/lib/dbconfig";
import { User } from "@/models/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const req = await request.json();
        //courses is array which contains the course id's
        //find the current user
        const courses = req.courses;

        let currUser;
        try {
            currUser = await User.findById(req.user_id);
        } catch (error) {
            return NextResponse.json({
                msg: "User not found in the database"
            });
        }

        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            currUser.courses.push(...courses);
            await currUser.save({ session });
            await session.commitTransaction();
        } catch (error) {
            console.error("Transaction failed:", error);
            await session.abortTransaction();
            return NextResponse.json({
                msg: "Error during transaction. Course not saved."
            });
        }

        return NextResponse.json({
            msg: "Course purchased successfully"
        })

    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({
            msg: "Unexpected error occurred."
        });
    }
}