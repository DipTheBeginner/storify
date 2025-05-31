import prisma from "@repo/db/client";
import { Request, Response } from "express";



export default async function (req: Request, res: Response) {
    const { userId, storyId } = req.body;

    if(!userId || !storyId){
        res.status(500).json({
            message:"Could not find user Id and story Id"
        })
        return;
    }

    try {
        
        const existingLike = await prisma.like.findFirst({
            where: { storyId, userId }
        });

        if(existingLike){
            await prisma.like.delete({
                where:{id:existingLike.id}
            });
            res.status(404).json({
                message:"Unliked the Story"
            })
            return;
        }else{
            await prisma.like.create({
                data:{
                    storyId,
                    userId
                },
            });
            res.status(200).json({
                message:"Liked the Story"
            })
            return;

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Something went wrong"
        })
        return;

    }

}