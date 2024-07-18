'use client'

import { Button, Typography } from "@mui/material"
import Link from "next/link"
import { useSession } from "next-auth/react"
import Image from "next/image"

const Appbar = () => {

    const { data: session } = useSession()

    interface User {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;

    }

    const userEmail = session?.user?.email ? (
        <Typography>
            {session?.user?.email}
        </Typography>
    ) : null

    const userImage = session?.user?.image ? (
        <Image
            src={session?.user?.image}
            alt="Profile pic"
            width={40}
            height={40}
            className="border-1 border-gray-500 rounded-full p-1"
        />
    ) : null

    return (<nav className="sticky h-16 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <div className="flex h-16 items-center justify-between border-b border-zinc-200">
            <Link
                href='/'
                className="z-40 font-semibold ml-4 text-lg">
                <span>
                    Better-You.
                </span>
            </Link>

            <div className="items-center flex space-x-5 mr-4">

                <Link
                    href='/instructor'
                    className="items-center hover:text-sky-700">
                    Teach on Better.
                </Link>

                <Link
                    href='/dashboard'
                    className="items-center hover:text-sky-700">
                    Dashboard
                </Link>

                {session ? (
                    <Link href='/api/auth/signout' className="hover:text-sky-700">
                        Sign out
                    </Link>) : (
                    <Link href='/api/auth/signin' className="hover:text-sky-700">
                        Log in
                    </Link>)}

                {!session ? (<Link href='/api/auth/signin'>
                    <Button variant="contained" className="bg-blue-500">
                        Join for free
                    </Button>
                </Link>) : null}

                {session ? (
                    <div>
                        {userImage}
                    </div>
                ) : null}

            </div>
        </div>
    </nav>)
}

export default Appbar