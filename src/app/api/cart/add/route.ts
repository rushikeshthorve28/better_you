import { connectToDatabase } from "@/lib/dbconfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const req = await request.json();
        let currUser;
        try {
            currUser = await User.findById(req.user_id);
        } catch (error) {
            return NextResponse.json({
                msg: "User not found"
            })
        }

        currUser.cart.push(req.course_id);
        await currUser.save();

        return NextResponse.json({
            msg: "course added to cart"
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg: error
        })
    }
}