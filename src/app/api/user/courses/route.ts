import { connectToDatabase } from "@/lib/dbconfig";
import { Course } from "@/models/courseModel";
import { User } from "@/models/userModel";
import { courses } from "@/types/courses";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

//route to get user's purchased courses
export async function GET() {
    try {
        await connectToDatabase();
        const user_id = cookies().get('user_id');
        // const user_id = {
        //     value: "65aace64282abd804916773f"
        // }
        if(user_id) {
            console.log('user_id is there');
            console.log(user_id.value);
        } else {
            console.log('no user id');
        }
        const currUser = await User.findById(user_id?.value);
        const coursesIDs = currUser.courses;
        const coursePromises = coursesIDs.map(async (id: any) => {
            return await Course.findById(id)
        })
        const courses = await Promise.all(coursePromises);
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json(error);
    }
}