import prisma from "@repo/db/client";
import { Request, Response } from "express";




export default async function getStoryController(req: Request, res: Response) {

    try {

        const stories = await prisma.story.findMany();

        if(stories){
            res.status(200).json({
                
            })

        }


    }
    catch (error) {


    }


}