import { hash, verify } from "argon2";
import { generateJWT } from "../helpers/generate-jwt.js";
import Student from "../student/student.model.js";
import Teacher from "../teacher/teacher.model.js";

export const registerTeacher = async (req, res) => {
    try {
        const data = req.body;
        const encryptedPassword = await hash(data.password);

        data.password = encryptedPassword;
        const teacher = await Teacher.create(data);
        return res.status(201).json({
            message: "Registro de profesor exitoso",
            name: teacher.name,
            email: teacher.email
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Error al registrar el profesor",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const student = await Student.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!student) {
            return res.status(404).json({
                message: "Credenciales inválidas",
                error: "El nombre de usuario o correo electrónico no existen en la base de datos"
            });
        }

        const validPassword = await verify(password, student.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "La contraseña ingresada es incorrecta"
            });
        }

        const token = await generateJWT(student.id);
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            studentDetails: {
                token: token,
                profilePicture: student.profilePicture
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al iniciar sesión",
            error: err.message
        });
    }
};

export const registerStudent = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password);

        data.password = encryptedPassword;
        data.profilePicture = profilePicture;
        const student = await Student.create(data);
        return res.status(201).json({
            message: "Registro de estudiante exitoso",
            name: student.name,
            email: student.email
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Error al registrar el estudiante",
            error: err.message
        });
    }
};