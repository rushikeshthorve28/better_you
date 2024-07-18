'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAdminCourses } from "@/services/queries";
import Image from "next/image";
import Link from "next/link";

const courses = () => {
    const courseQuery = useAdminCourses();

    return <div>
        <div className="p-10 border border-zinc-300 m-4 shadow-lg lg:flex justify-around items-center lg:m-10">
            <div className="flex justify-center items-center">
                Jump into Course Creation
            </div>
            <div className="flex justify-center items-center mt-12 lg:mt-0">
                <Link href='/instructor/courses/new'>
                    <Button size="xl">Create Your Course</Button>
                </Link>
            </div>
        </div>

        <div className="flex justify-center items-center">
            Previously create Courses
        </div>

        <div className="p-4">
                <div className="grid grid-cols-12 gap-4">
                    {
                        courseQuery.data?.map((item) => {
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

        <div className="flex justify-center items-center my-10 lg:my-16">
            <span>Based on your experience, we think these resources will be helpful.</span>
        </div>


        <div className="pt-2 pb-2 px-10 border border-zinc-300 m-4 shadow-lg lg:flex justify-around items-center lg:m-10">
            <div className="flex justify-center items-center lg:w-52 lg:h-52 lg:ml-16">
                <Image
                    src="/engaging-course.jpg"
                    alt="graphic"
                    width="300"
                    height="300">
                </Image>
            </div>
            <div className="lg:w-1/2 lg:mt-0 py-6 mt-2">
                <div className="mb-8">
                    <span className="text-2xl font-normal">Create an Engaging Course</span>
                </div>
                <span className="font-light text-justify">Whether you&apos;ve been teaching for years or are teaching for the first time, you can make an engaging course. We&apos;ve compiled resources and best practices to help you get to the next level, no matter where you&apos;re starting.</span>
                <div className="mt-8">
                    <span className="text-blue-600">Get started</span>
                </div>
            </div>
        </div>


        <div className="lg:flex justify-center items-center lg:h-72">
            <div className="pt-2 pb-2 px-10 border border-zinc-300 m-4 shadow-lg lg:flex justify-around items-center lg:m-10 lg:mr-5 lg:w-1/2 lg:h-full">
                <div className="flex justify-center items-center lg:w-52 lg:h-52 lg:ml-16">
                    <Image
                        src="/video-creation.jpg"
                        alt="graphic"
                        width="300"
                        height="300">
                    </Image>
                </div>
                <div className="lg:w-1/2 lg:mt-0 py-6 mt-2">
                    <div className="mb-8">
                        <span className="text-2xl font-normal">Get Started with Video</span>
                    </div>
                    <span className="font-light text-justify">Quality video lectures can set your course apart. Use our resources to learn the basics.</span>
                    <div className="mt-8">
                        <span className="text-blue-600">Get started</span>
                    </div>
                </div>
            </div>

            <div className="pt-2 pb-2 px-10 border border-zinc-300 m-4 shadow-lg lg:flex justify-around items-center lg:m-10 lg:ml-5 lg:w-1/2 lg:h-full">
                <div className="flex justify-center items-center lg:w-52 lg:h-52 lg:ml-16">
                    <Image
                        src="/build-audience.jpg"
                        alt="graphic"
                        width="300"
                        height="300">
                    </Image>
                </div>
                <div className="lg:w-1/2 lg:mt-0 py-6 mt-2">
                    <div className="mb-8">
                        <span className="text-2xl font-normal">Build Your Audience</span>
                    </div>
                    <span className="font-light text-justify">Set your course up for success by building your audience.</span>
                    <div className="mt-8">
                        <span className="text-blue-600">Get started</span>
                    </div>
                </div>
            </div>
        </div>


        <div className="pt-2 pb-2 px-10 border border-zinc-300 m-4 shadow-lg lg:flex justify-around items-center lg:m-10">
            <div className="flex justify-center items-center lg:w-52 lg:h-52 lg:ml-16">
                <Image
                    src="/newcomer-challenge.jpg"
                    alt="graphic"
                    width="300"
                    height="300">
                </Image>
            </div>
            <div className="lg:w-1/2 lg:mt-0 py-6 mt-2">
                <div className="mb-8">
                    <span className="text-2xl font-normal">Join the New Instructor Challenge!</span>
                </div>
                <span className="font-light text-justify">Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!</span>
                <div className="mt-8">
                    <span className="text-blue-600">Get started</span>
                </div>
            </div>
        </div>


        <div className="flex flex-col justify-center items-center my-10 lg:my-16 gap-8">
            <span>Are You Ready to Begin?</span>
            <Link href='/instructor/courses/new'>
                <Button size='xl'>Create Your Course</Button>
            </Link>
        </div>

    </div>

}

export default courses;