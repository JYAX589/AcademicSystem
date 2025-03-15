import jwt from "jsonwebtoken";

export const generateJWT = (uid) => {
  try {
    const token = jwt.sign({ uid }, process.env.SECRET_KEY, { expiresIn: "2h" });
    return { success: true, token };
  } catch (error) {
    return { success: false, message: error.message };
  }
};