import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({
                error: "Unauthorized access - No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            res.status(401).json({
                error: "Unauthorized access - invalid token"
            });
        }

        const user =  await User.findById(decoded.userId);

        if(!user){
            res.status(401).json({
                error: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error("Error protected routes middleware:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export default protectedRoute;