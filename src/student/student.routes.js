import { Router } from "express";
import {getStudentByIdValidator,deleteStudentValidator} from "../middlewares/check-validator.js";

import {getStudentById,deleteStudent,updatePassword,getStudentCourses,enrollInCourse,updateStudent} from "./student.controller.js";

const router = Router();

router.get(
    "/getCourses/:uid",
    getStudentCourses
);

router.post(
    "/enrollInCourse",
    enrollInCourse
);

router.get(
    "/findStudent/:uid",
    getStudentByIdValidator,
    getStudentById
);

router.delete(
    "/deleteStudent/:uid",
    deleteStudentValidator,
    deleteStudent
);

router.put(
    "/updateStudent/:uid",
    updateStudent
);

router.put(
    "/updatePassword/:uid",
    updatePassword
);

export default router;
