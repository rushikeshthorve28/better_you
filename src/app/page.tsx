import { Button } from "@/components/ui/button";
import { topCatogaries } from "@/helpers/topCategories";
import { connectToDatabase } from "@/lib/dbconfig";
import Image from 'next/image'
import Link from "next/link";
import { useEffect } from "react";

const Home = () => {
  return <div className="min-h-screen mx-32">
    <div className="flex justify-between items-center mt-10 md:max-2xl:px-6 ">
      <div className="text-6xl font-semibold text-zinc-800">
        <p>The Skills you want at a</p>
        <p>Price you will love</p>
        <div className="flex gap-8 mt-8">
          <Link href='/api/auth/signin'>
            <Button size="xl">Join for Free</Button>
          </Link>
          <Link href='courses'>
            <Button size="xl">Explore</Button>
          </Link>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden">
        <Image
          src="/Art-1.jpg"
          alt="a boy with computer"
          width={900}
          height={600}
          quality={100}
        />
      </div>
    </div>
    <div className="mt-16 py-10">
      <span className="font-bold text-2xl">Our Top Categories</span>
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 md:max-xl:grid-cols-3 gap-4 mt-6">
        {topCatogaries.map((category) => {
          return <div key={category.domain}>
            <Image
              src={category.src}
              alt={category.domain}
              width={200}
              height={200}
              quality={100}
            />
            <div className="mt-2">
              <span className="font-bold text-md">{category.domain}</span>
            </div>
          </div>
        })}
      </div>
    </div>
  </div>
}

export default Home;