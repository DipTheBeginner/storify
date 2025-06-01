import prisma from "@repo/db/client";
import { Request, Response } from "express";



export default async function (req: Request, res: Response) {
    console.log("Request came likecontroller")
    const { userId, storyId } = req.body;
    console.log("User id and story id",userId,storyId)

    if (!userId || !storyId) {
        res.status(500).json({
            message: "Could not find user Id and story Id"
        })
        return;
    }

    try {

        const existingLike = await prisma.like.findFirst({
            where: { storyId, userId }
        });

        console.log("Existing like is", existingLike)

        if (existingLike) {

            const deletedLike = await prisma.like.delete({
                where: { id: existingLike.id }
            });
            console.log("Deleetd like is ",deletedLike);
            res.status(200).json({
                message: "Unliked the Story",
                data: "DISLIKED"
            })
            return;
        } else {
            await prisma.like.create({
                data: {
                    storyId,
                    userId
                },
            });
            res.status(200).json({
                message: "Liked the Story",
                data: "LIKED"

            })
            return;

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
        return;

    }

}