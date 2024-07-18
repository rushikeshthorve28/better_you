import { useMutation } from "@tanstack/react-query";
import { courses } from "@/types/courses";
import { createTodo } from "./api";

export function useCreateCourse() {
    return useMutation({
        mutationFn: (data: courses) => createTodo(data),
    })
}