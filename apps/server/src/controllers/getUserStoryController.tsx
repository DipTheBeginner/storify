import prisma from "@repo/db/client";
import { Request, Response } from "express";




export default async function getUserStoryController(req: Request, res: Response) {

    let email = req.params.email;

    if (!email?.includes("@gmail.com")) {
        email += "@gmail.com"
    }


    const story = await prisma.user.findUnique({

        where: {
            email: email
        },

        include:{
            story:true,
            followers:true,
            following:true,
        }

    })

    console.log("Email in account section",email)

    console.log("Story fetched in account section",story);




}