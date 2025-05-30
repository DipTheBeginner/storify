import prisma from "@repo/db/client";
import { Request, Response } from "express";





export default async function getMyStoryController(req: Request, res: Response) {

    const { userId } = req.query;
    if (!userId) {
        res.status(400).json({
            error: "User Id is Required"
        })
        return;
    }

    try {
        const myStories = await prisma.story.findMany({
            where: { authorId: Number(userId) },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true
                    },
                },
                tag: true,
            },

        });

        res.status(200).json({
            data: myStories
        })
        return;
    } catch (error) {
        console.log("Error fetching stories", error);
        res.status(500).json({
            error: "Server Error"
        })
        return;
    }



}