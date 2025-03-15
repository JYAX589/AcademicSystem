import rateLimit from "express-rate-limit";

const Limit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: {
        success: false,
        msg: 'Demasiadas peticiones por favor intente de nuevo después de 15 minutos'
    }
})

export default Limit;