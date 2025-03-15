import { Router } from "express";
import {getTeacherByIdValidator,deleteTeacherValidator} from "../middlewares/check-validator.js";

import {getTeacherById,getTeachers,deleteTeacher,updatePassword,getTeacherCourses} from "./teacher.controller.js";

const router = Router();

router.get(
    "/findTeacher/:uid",
    getTeacherByIdValidator,
    getTeacherById
);

router.get(
    "/getCourses/:uid",
    getTeacherCourses
);

router.delete(
    "/deleteTeacher/:uid",
    deleteTeacherValidator,
    deleteTeacher
);

router.get(
    "/",
    getTeachers
);

router.put(
    "/updatePassword/:uid",
    updatePassword
);

export default router;
