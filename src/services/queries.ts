import { useQuery } from "@tanstack/react-query";
import { getAdminCourses, getCourses, getMyCourses } from "./api";

export function useCourses() {
    return useQuery({
        queryKey: ["courses"],
        queryFn: getCourses,
    })
}

export function useMyCourses() {
    return useQuery({
        queryKey: ["myCourses"],
        queryFn: getMyCourses,
    })
}

export function useAdminCourses() {
    return useQuery({
        queryKey: ["adminCourses"],
        queryFn: getAdminCourses,
    })
}