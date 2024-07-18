import { connectToDatabase } from "@/lib/dbconfig";
import { Course } from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const courses = await Course.find();
        return NextResponse.json(courses);
    } catch (error) {
        console.log(error);
    }
}
