'use client'

import { Card } from "@/components/ui/card";
import { useMyCourses } from "@/services/queries";
import Image from "next/image";
import { useSession } from "next-auth/react"

const Dashboard = () => {

    const coursesQuery = useMyCourses();
    const { data: session, status } = useSession()


    if (coursesQuery.isPending) {
        return <span>Loading....</span>
    }

    if (coursesQuery.isError) {
        return <span>There is an Error...</span>
    }

    return (
        <div className="p-4">
            <div className="py-4">
                <span className="font-semibold text-xl">
                    {session?.user?.name}'s Courses
                </span>
            </div>
            <div className="grid grid-cols-12 gap-4">
                {
                    coursesQuery.data?.map((item) => {
                        return <div key={item.title} className="col-span-6 md:col-span-4 lg:col-span-3">
                            <Card>
                                <div>
                                    <Image
                                        src={item.image}
                                        alt="course thumbnail"
                                        width={600}
                                        height={135}
                                    />
                                </div>
                                <div className="flex flex-col p-3">
                                    <span className="font-bold text-md">{item.title}</span>
                                    {/* <span className="text-zinc-700 text-xs  ">{item.description}</span> */}
                                </div>

                                <div className="px-3 pb-3 flex justify-between">
                                    <p><span className="text-sm"></span><span className="font-semibold">{`\u20B9${item.price}`}</span></p>
                                    <p><span className="text-sm"></span><span className="opacity-60 hover:text-blue-600 hover:opacity-100">see more</span></p>
                                </div>
                            </Card>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Dashboard