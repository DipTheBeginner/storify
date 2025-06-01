import prisma from "@repo/db/client";
import { Request, Response } from "express";




export default async function getStoryController(req: Request, res: Response) {

    try {

        const stories = await prisma.story.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        id:true
                    }
                },

                likes: true,
                tag: {
                    select: {
                        tagName: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({
            success: true,
            message: "Stories fetched successfully",
            data: stories
        });

        return;
    }
    catch (error) {
        console.log("Error in fetching stories", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching stories"
        })


    }


}