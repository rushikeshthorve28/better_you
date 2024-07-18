import { connectToDatabase } from "@/lib/dbconfig";
import { Admin } from "@/models/adminModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {
        await connectToDatabase();
        const req = await request.json();
        const existingAdmin = await Admin.findOne({
            email: req.email
        });

        if (existingAdmin) {
            cookies().set({
                name: 'admin_id',
                value: existingAdmin.id
            })
            return NextResponse.json({
                msg: 'Admin already exists'
            });  //Todo: set admin_id in cookies
        } else {
            const newAdmin = new Admin({
                name: req.name,
                email: req.email
            });
            await newAdmin.save();
            //Todo: set admin_id on cookies
            const currAdmin = await Admin.findOne({ email: req.email })
            cookies().set({
                name: 'admin_id',
                value: currAdmin.id
            })
            return NextResponse.json({
                msg: 'New Admin created successfully'
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}
