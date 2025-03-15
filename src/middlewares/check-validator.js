import { body, param } from "express-validator";
import { existingEmail, existingUsername, existingUsernameTeacher, studentExists, teacherExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Ingrese un correo válido"),
    body("username").optional().isString().withMessage("Ingrese un username válido"),
    body("password").isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos,
    
]

export const getStudentByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(studentExists),
    validarCampos,
    
]

export const deleteStudentValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(studentExists),
    validarCampos,
    
]

export const getTeacherByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(teacherExists),
    validarCampos,
    
]

export const deleteTeacherValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(teacherExists),
    validarCampos,
    
]

export const registerValidatorStudent = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("username","El username es obligatorio").not().isEmpty(),
    body("email", "El correo es obligatorio").not().isEmpty(),
    body("email", "Ingrese un correo válido").isEmail(),
    body("email").custom(existingEmail),
    body("username").custom(existingUsername),
    validarCampos,
    
]

export const registerValidatorTeacher = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("username","El username es obligatorio").not().isEmpty(),
    body("email", "El correo es obligatorio").not().isEmpty(),
    body("email", "Ingrese un correo válido").isEmail(),
    body("email").custom(existingUsername),
    body("username").custom(existingUsernameTeacher),
    validarCampos,
    
]