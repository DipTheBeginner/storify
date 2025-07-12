import prisma from "@repo/db/client";
import { Request, Response } from "express";




export default async function getUserStoryController(req: Request, res: Response) {

    console.log("Req reach to getusercontroller");

    let email = req.params.email;

    if (!email?.includes("@gmail.com")) {
        email += "@gmail.com"
    }

    try{
        const story = await prisma.user.findUnique({

        where: {
            email: email
        },

        include: {
            story: {
                include:{
                    author:true,
                    likes:true
                }
            },
            followers: true,
            following: true,
        }

    })

    res.status(200).json({
        data: story
    })
    return;


    }catch(error){
        res.status(404).json({
            message:"Error fetching stories"
        })
    }

}