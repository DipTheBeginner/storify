import prisma from "@repo/db/client";
import { Request, Response } from "express";



export default async function (req: Request, res: Response) {

    const { id } = req.params;
    const { title, content, imageUrl } = req.body;

    const userId = req.user?.id;

    if (!userId) {
        res.status(401).json({
            error: "Unauthorized"
        })
        return;
    }

    try {
        const story = await prisma.story.findUnique({
            where: { id },
            select: {
                authorId: true,
            }

        })

        if (!story) {
            res.status(404).json({
                error: "Story not found"
            })
            return;
        }

        if (story.authorId !== userId) {
            res.status(403).json({
                error: "You are not allowed to edit story"
            })
        }

        const updateStory = await prisma.story.update({
            where: { id },
            data: {
                title,
                content,
                imageUrl,
                isUpdated: true,
            },
        });

        res.status(200).json({
            success: true,
            story: updateStory
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong"
        })
        return;
    }



}