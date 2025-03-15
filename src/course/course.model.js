import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del curso es obligatorio."],
      unique: [true, "Este nombre de curso ya está en uso."],
      maxLength: [50, "El nombre del curso no puede exceder los 50 caracteres."],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "El profesor es obligatorio."],
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);