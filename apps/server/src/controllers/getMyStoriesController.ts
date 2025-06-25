import prisma from "@repo/db/client";
import { Request, Response } from "express";

export default async function getUserStoryController(req: Request, res: Response) {
  if (!req.user) {
    return res.status(400).json({
      error: "User authentication required",
    });
  }

  const { email } = req.params;

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      error: "Email is required and must be a string",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const myStories = await prisma.story.findMany({
      where: { authorId: user.id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        tag: true,
      },
    });

    return res.status(200).json({
      data: myStories,
    });

  } catch (error) {
    console.error("Error fetching stories:", error);
    return res.status(500).json({
      error: "Server error",
    });
  }
}
