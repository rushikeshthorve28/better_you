import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "./ui/label";
import { categories } from "@/helpers/categories";
import { priceTiers } from "@/helpers/priceTiers";
import { currencies } from "@/helpers/currencies";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { useCreateCourse } from "@/services/mutations";
import { Toaster, toast } from "react-hot-toast";

const formSchema = Z.object({
    title: Z.string().max(55, {
        message: "Title should be a max of 50 characters."
    }),
    subtitle: Z.string().max(120, {
        message: "Cannot be more than 120 characters."
    }),
    description: Z.string(),
    category: Z.string(),
    image: Z.string(),
    price: Z.string(),
})

const CourseLanding = () => {

    const form = useForm<Z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            subtitle: "",
            description: "",
            category: "",
            image: "",
            price: "",
        }
    })

    const createCoursesMutation = useCreateCourse();

    const onSubmit = (values: Z.infer<typeof formSchema>) => {
        values.image = selectedImage!;
        console.log(values);
        createCoursesMutation.mutate(values);
        if(createCoursesMutation.isSuccess) {
            toast.success('Course added successfully')
        }
    }

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string)
            };
            reader.readAsDataURL(file);
        }
    }

    return <div>
        <Toaster
            position="bottom-right"
            reverseOrder={false}
        />
        <Card>
            <CardHeader>
                <CardTitle>Course Landing Page</CardTitle>
                <CardDescription>As you complete this section, think about creating a compelling Course Landing Page that demonstrates why someone would want to enroll in your course.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insert your course title."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your title should be a mix of attention-grabbing, informative, and optimized for search
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="subtitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Subitle
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insert your course Subtitle."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Use 1 or 2 related keywords, and mention 3-4 of the most important areas that you&apos;ve covered during your course.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Description
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insert your course Description."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Description should have minimum 200 words.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Category
                                    </FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger id="category">
                                                <SelectValue placeholder="Select"
                                                />
                                            </SelectTrigger>
                                            <SelectContent position="popper" >
                                                {categories.map((value) => {
                                                    return <div key={value}>
                                                        <SelectItem value={value}
                                                        >
                                                            {value}
                                                        </SelectItem>
                                                    </div>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        Category should relevent to course contents
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Image
                                    </FormLabel>
                                    <FormControl>
                                        <div className="flex space-x-4">
                                            <div className="w-1/2 border-2">
                                                {selectedImage ? (
                                                    <Image
                                                        src={selectedImage}
                                                        alt="Selected Graphic"
                                                        width={750}
                                                        height={422}
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/placeholder.jpg"
                                                        alt="Placeholder Graphic"
                                                        width={750}
                                                        height={422}
                                                    />
                                                )}
                                            </div>
                                            <div className="w-1/2 space-y-2">
                                                <span className="text-gray-500">
                                                    Upload your course image here. Important guidelines: jpg, .jpeg,. gif, or .png. no text on the image.
                                                </span>
                                                <Input
                                                    type="file"
                                                    onChange={handleImageChange}

                                                />

                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>


                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Pricing
                                    </FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-12 gap-6 pt-4">
                                            <div className="col-span-2">
                                                <Label htmlFor="currency">Currency</Label>
                                                <Select>
                                                    <SelectTrigger id="currency">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        {currencies.map((value) => {
                                                            return <div>
                                                                <SelectItem value={value}
                                                                >
                                                                    {value}
                                                                </SelectItem>
                                                            </div>
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="col-span-4">
                                                <Label htmlFor="price">Price</Label>
                                                <Select onValueChange={field.onChange}>
                                                    <SelectTrigger id="price">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        {priceTiers.map((value) => {
                                                            return <div>
                                                                <SelectItem value={value}
                                                                >
                                                                    {value}
                                                                </SelectItem>
                                                            </div>
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>


                            )}
                        />
                        <Button
                            type="submit"
                            disabled={createCoursesMutation.isPending}
                            >
                            {createCoursesMutation.isPending ? 'Adding...' : 'Add course'}
                        </Button>

                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
}

export default CourseLanding;