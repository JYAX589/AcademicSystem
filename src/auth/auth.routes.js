import { Router } from "express";
import { registerStudent, registerTeacher, login} from "./auth.controller.js"
import { registerValidatorStudent, registerValidatorTeacher, loginValidator} from "../middlewares/check-validator.js";

const router = Router()

router.post(
    "/login", 
    loginValidator, 
    login
)

router.post(
    "/registerStudent",
    registerValidatorStudent, 
    registerStudent
)
router.post(
    "/registerTeacher",
    registerValidatorTeacher, 
    registerTeacher
)



export default router
