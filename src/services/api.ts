import { courses } from "@/types/courses";
import axios from "axios"

const BASE_URL = "http://localhost:3000";
const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export const getCourses = async () => {
    return (
        (await axiosInstance.get<courses[]>("api/courses")).data
    );
}

export const createTodo = async (data: courses) => {
    await axiosInstance.post("api/instructor/courses/new", data);
}

export const getMyCourses = async () => {
    return (
        (await axiosInstance.get<courses[]>("api/user/courses")).data
    )
}

export const getAdminCourses = async () => {
    return (
        (await axiosInstance.get<courses[]>("api/instructor/courses")).data
    )
}