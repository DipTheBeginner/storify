import prisma from "@repo/db/client";
import { Request, Response } from "express";

export default async function getFullStoryController(req: Request, res: Response) {

    console.log("Reached in full story")

    const { authorId, storyId } = req.params;

    console.log("authorId and StoryId is ", authorId, storyId);


    if (!authorId || !storyId) {
        res.status(400).json({
            success: false,
            message: "Author ID and Story ID are required"
        });
        return;
    }


    try {
        const fullStories = await prisma.story.findFirst({
            where: {
                id: storyId,
                authorId: parseInt(authorId)
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        id: true,
                        image:true,
                    }
                },
                likes: true,
                tag: {
                    select: {
                        tagName: true
                    }
                }
            }
        })

        if (!fullStories) {
            res.status(404).json({
                message: "Story not found"
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Story fetched Successfully",
            data:
                fullStories

        })

    } catch (error) {
        console.log("Error in fetching Stories"),
            res.status(404).json({
                success: false,
                message: "Something went wrong while Fetching Stories",

            });
        return;

    }

}