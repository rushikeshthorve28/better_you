import { connectToDatabase } from "@/lib/dbconfig";
import { Course } from "@/models/courseModel";
import { User } from "@/models/userModel";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const headerList = headers();
        const user_id = headerList.get('user_id');

        const currUser = await User.findById(user_id);
        const cart_id = currUser.cart

        const cart_items = cart_id.map(async (_id: any) => {
            return await Course.findById(_id);
        })

        const cart = await Promise.all(cart_items);

        if(cart.length === 0) {
            return NextResponse.json({
                msg: "There's lonely in here"
            })
        }

        return NextResponse.json(cart);

    } catch (error) {
        console.log(error);
    }
}