import prisma from "@repo/db/client";
import { Request, Response } from "express";


export default async function getUserStoryController(req: Request, res: Response) {
    if (!req.user) {
        res.status(400).json({
            error: "User Id is Required"
        })
        return;
    }
    const { email } = req.params;
    if (!email || typeof email !== "string") {
        res.status(400).json({
            error: "Email is Required and must be a string"
        });
        return;

    }
    try {

        const user = await prisma.user.findUnique({
            where: {
                email: {
                    email
                }
            }
        })

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