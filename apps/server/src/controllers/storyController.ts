import prisma from "@repo/db/client"
import { Request, Response } from "express";




export default async function storyController(req: Request, res: Response) {
    try {

        const { title, content, imageUrl, isUpdated, tag } = req.body;


        const user = req.user



        if (!user) {
            res.status(401).json({
                message: "Unauthorized"

            })

            return;
        }

        const newStory = await prisma.story.create({
            data: {
                authorId: user.id,
                title,
                content,
                imageUrl,
                isUpdated,
                tag
            }

        })

        res.status(201).json({
            newStory
        })
        return;
    } catch (error) {
        console.log("Error creating Story", error);
        res.status(500).json({
            message: "Something Went wrong"
        })
        return;
    }



}