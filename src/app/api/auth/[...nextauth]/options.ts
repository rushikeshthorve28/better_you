import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectToDatabase } from "@/lib/dbconfig";
import axios from "axios";
import { User } from "@/models/userModel";
import { error } from "console";
import { cookies } from "next/headers";
import { Admin } from "@/models/adminModel";


export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            try {
                await connectToDatabase();
                const existingUser = await User.findOne({ email: user.email });
                const existingAdmin = await Admin.findOne({ email: user.email });

                if(existingAdmin) {
                    const admin_id = existingAdmin.id;
                    cookies().set({
                        name: 'admin_id',
                        value: admin_id
                    })
                }

                if (existingUser) {
                    console.log('User already exists');
                    const user_id = existingUser.id;
                    console.log(user_id);
                    cookies().set({
                        name: 'user_id',
                        value: user_id
                    })
                } else {
                    const newUser = new User({
                        name: user.name,
                        email: user.email
                    });
                    await newUser.save();
                    console.log('New user created');
                    const currUser = await User.findOne({ email: user.email });
                    console.log(currUser.id);
                    cookies().set({
                        name: 'user_id',
                        value: currUser.id
                    })
                }
                return true;
            } catch (error) {
                console.error('Error during sign-in:', error);
                return false;
            }
            //Todo: set user_id and admin_id in cookies
        }

    }
}
