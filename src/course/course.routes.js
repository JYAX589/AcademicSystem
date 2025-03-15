import { Router } from "express";
import { getAllCourses, updateCourse, createCourse, deleteCourse} from "../course/course.controller.js";

const router = Router()

router.get("/", 
    getAllCourses
)

router.put(
    "/updateCourse/:courseId",
    updateCourse
);

router.post(
    "/addCourse",
    createCourse
);

router.delete(
    "/deleteCourse/:courseId",
    deleteCourse
);

export default router