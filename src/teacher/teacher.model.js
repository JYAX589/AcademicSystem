import { Schema, model } from "mongoose";

export const teacherSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio."],
      maxLength: [20, "El nombre no puede exceder los 25 caracteres."],
    },
    surname: {
      type: String,
      required: [true, "El apellido es obligatorio."],
      maxLength: [20, "El apellido no puede exceder los 25 caracteres."],
    },
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio."],
      unique: [true, "Este nombre de usuario ya está en uso."],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria."],
      minLength: [8, "La contraseña debe tener al menos 8 caracteres."],
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio."],
      unique: [true, "Este correo electrónico ya está registrado."],
    },
    phone: {
      type: String,
      required: [true, "El número de teléfono es obligatorio."],
      minLength: [8, "El número de teléfono debe tener 8 dígitos."],
      maxLength: [8, "El número de teléfono debe tener 8 dígitos."],
    },
    role: {
      type: String,
      required: [true, "El rol es obligatorio."],
      enum: {
        values: ["TEACHER_ROLE", "STUDENT_ROLE"],
        message: "El rol debe ser TEACHER_ROLE o STUDENT_ROLE.",
      },
      default: "TEACHER_ROLE",
    },
    status: {
      type: Boolean,
      default: true,
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

teacherSchema.methods.toJSON = function () {
  const { password, _id, ...teacher } = this.toObject();
  teacher.uid = _id;
  return teacher;
};

export default model("Teacher", teacherSchema);