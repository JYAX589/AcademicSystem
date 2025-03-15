import { hash, verify } from "argon2"
import Teacher from "./teacher.model.js"
import Course from "../course/course.model.js"
import Student from "../student/student.model.js"

export const deleteTeacher = async (req, res) => {
    try{
        const { uid } = req.params

        const teacher =  await Teacher.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Maestro Eliminado",
            teacher
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el maestro",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { newPassword } = req.body;

        const teacher = await Teacher.findById(uid);

        if (await verify(teacher.password, newPassword)) {
            return res.status(400).json({
                success: false,
                message: "Ingresa una nueva password",
            });
        }

        const encryptedPassword = await hash(newPassword);

        await Teacher.findByIdAndUpdate(uid, { password: encryptedPassword });

        return res.status(200).json({
            success: true,
            message: "Password actualizada",
        });
    } catch (err) {
        return handleError(res, "Error al actualizar password", err);
    }
};

export const getTeachers = async(req, res) => {
    try{
        const { limits = 3, from = 0} = req.query
        const query = {status: true}

        const [ total, teachers ] = await Promise.all([
            Teacher.countDocuments(query),
            Teacher.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            teachers
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar los maestros",
            error: err.message
        })
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        await Promise.all([
            Student.updateMany(
                { courses: courseId },
                { $pull: { courses: courseId } }
            ),
            Course.findByIdAndDelete(courseId),
        ]);

        return res.status(200).json({ message: "Curso eliminado y estudiantes desasignados" });
    } catch (err) {
        return handleError(res, "Error al eliminar curso", err);
    }
};

export const getTeacherCourses = async (req, res) => {
    try {
        const courses = await Course.find({ teacher: req.params.uid });

        if (courses.length === 0) {
            return res.status(404).json({ message: "El profesor no tiene cursos asignados" });
        }

        return res.status(200).json({ courses });
    } catch (err) {
        return res.status(500).json({ message: "Error al obtener cursos", error: err.message });
    }
};

export const getTeacherById = async(req, res) => {
    try{
        const { uid } = req.params
        const teacher = await Teacher.findById(uid)

        if(!teacher){
            return res.status(404).json({
                success: false,
                message: "Maestro no existe",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            teacher
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el maestro",
            error: err.message
        })
    }
}