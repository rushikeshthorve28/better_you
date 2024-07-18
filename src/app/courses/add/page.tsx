'use client'

import {
    Button,
    Card,
    CardContent,
    CardMedia,
    TextField,
    Typography
} from "@mui/material"
import axios from "axios"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast'

const AddCourse = () => {
    const [title, setTitle] = useState("Title")
    const [description, setDescription] = useState("Description")
    const [courseImg, setCourseimg] = useState("https://media.istockphoto.com/id/1164104671/vector/alien-space-ship.jpg?s=612x612&w=0&k=20&c=SAlbf9_EPGs2wC_dBeWk-sashLZcg5FKccO931Hhi6U=")
    const [price, setPrice] = useState("")

    const onClick = async () => {
        // const res = await axios.post('url/addCourse', {
        //     title: title,
        //     description: description,
        //     image: courseImg,
        //     price: price
        // })
        const message = "Course created successfully"
        toast.success(message)
    }

    return (<div className="flex justify-around items-center min-h-screen grainy">
        <Toaster />
        <section className="flex flex-col items-start p-6 drop-shadow-xl rounded-lg bg-white">
            <Typography className="font-bold text-4xl text-zinc-600">
                Course Details
            </Typography>
            <div className="flex flex-col items-start justify-around mt-6">
                <TextField label="Title" variant="outlined" className="mb-2"
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                <TextField label="Description" variant="outlined" className="mb-2"
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
                <TextField label="Image URL" variant="outlined" className="mb-2"
                    onChange={(e) => {
                        setCourseimg(e.target.value)
                    }} />
                <TextField label="Price" variant="outlined"
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }} />
            </div>
            <Button
                variant="contained"
                className="bg-blue-500 mt-5"
                onClick={() => {
                    onClick()
                }}>Add course</Button>
        </section>
        <section className="w-96 h-96" >
            <Card>
                <CardMedia
                    component="img"
                    alt="course Image"
                    image={courseImg}
                    className="max-h-60"
                />
                <CardContent>
                    <Typography className="text-4xl">
                        {title}
                    </Typography>
                    <Typography className="mt-3">
                        {description}
                    </Typography>
                    <Typography className="mt-3 font-bold">
                        Price: {price}
                    </Typography>
                </CardContent>
            </Card>
        </section>
    </div>)
}

export default AddCourse