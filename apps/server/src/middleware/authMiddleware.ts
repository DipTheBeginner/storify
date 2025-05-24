import jwt from "jsonwebtoken";
import {  Response, NextFunction, Request, } from "express";



export default function middleware(req: Request , res: Response, next: NextFunction): void {
    console.log("Req body is ",req.body)
    console.log("Req header is ",req.headers)
    try {
        const authHeader = req.headers.authorization;
        console.log("authHeader is ",authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ msg: "unauthorized: token missing or malformed" });
            return;
        }

        const token = authHeader.split(" ")[1];
        console.log("Token is ",token)


        //@ts-ignore
        jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, decodedUser) => {
            if (err) {
                res.status(401).json({
                    msg: "not authorized",
                    error: err
                });
                return;
            }

            req.user = decodedUser as AuthUser;
            console.log("decode user is ",decodedUser)
            req.user 
            next();
        });
    } catch (error) {
        res.status(401).json({
            message: "middleware error",
            error,
        });
        return;
    }
}