import prisma from "@repo/db/client";
import { Request, Response } from "express";




export default async function createStoryController(req: Request, res: Response) {

    try {

        const { title, content, tags } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({
                error: "Unauthorized"
            })
            return;
        }

        if (!title || !content) {
            res.status(400).json({
                error: "Title and content are required"
            })
            return;
        }

        const story = await prisma.story.create({
            data: {
                title,
                content,
                authorId: userId,
                tag: {
                    create: tags.map((tag: string) => ({
                        tagName: tag,
                    })),
                },
            },
            include: {
                tag: true,
            },
        });

        res.status(201).json({
            success:true,
            message:"Story created Successfully",
            story
        })


    } catch (error) {
        console.log("Error in creating story")
    }
}