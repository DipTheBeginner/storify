import { NextFunction, Request, Response } from "express";



export default function authMiddleware(req:Request,res:Response,next:NextFunction){
    
    const authHeader=req.headers.authorization;

    if(!authHeader){
        res.json({
            message:"Token doesn't exist"
        })
    }

    const token=authHeader?.split(" ")[1];

    




}