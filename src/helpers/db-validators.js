import Student from "../student/student.model.js"
import Teacher from "../teacher/teacher.model.js"

export const existingEmail = async(email = '') =>{
    const exists = await Student.findOne({email})
    if(exists){
        throw new Error(`El email ${email} ya fue registrado previamente`)
    }
}

export const existingUsername = async(username = '') =>{
    const exists = await Student.findOne({username})
    if(exists){
        throw new Error(`El email ${username} ya fue registrado previamente`)
    }
}

export const existingEmailTeacher = async(email = '') =>{
    const exists = await Teacher.findOne({email})
    if(exists){
        throw new Error(`El email ${email} ya fue registrado previamente`)
    }
}

export const existingUsernameTeacher = async(username = '') =>{
    const exists = await Teacher.findOne({username})
    if(exists){
        throw new Error(`El email ${username} ya fue registrado previamente`)
    }
}

export const studentExists = async(uid = '') =>{
    const exists = await Student.findById(uid)
    if(!exists){
        throw new Error("El estudiante no existe")
    }
}

export const teacherExists = async(uid = '') =>{
    const exists = await Teacher.findById(uid)
    if(!exists){
        throw new Error("El maestro no existe")
    }
}