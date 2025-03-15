import Course from "./course.model.js";
import Teacher from "../teacher/teacher.model.js"

export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { name } = req.body;

        const course = await Course.findByIdAndUpdate(courseId, { name }, { new: true });

        if (!course) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }

        return res.status(200).json({ message: "Curso actualizado", course });
    } catch (err) {
        return res.status(500).json({ message: "Error al actualizar curso", error: err.message });
    }
};

export const createCourse = async (req, res) => {
    try {
        const { name, teacherId } = req.body;

        const teacher = await Teacher.findById(teacherId);

        if (!teacher) {
            return res.status(404).json({ message: "Profesor no encontrado" });
        }
        const newCourse = new Course({ name, teacher: teacherId });
        await newCourse.save();

        return res.status(201).json({ message: "Curso creado exitosamente", newCourse });
    } catch (err) {
        return res.status(500).json({ message: "Error al crear curso", error: err.message });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("teacher", "name").populate("students", "name");

        return res.status(200).json({
            message: "Cursos disponibles",
            courses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al obtener cursos",
            error: err.message
        });
    }
};

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

