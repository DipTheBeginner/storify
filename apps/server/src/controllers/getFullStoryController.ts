import prisma from "@repo/db/client";
import { Request, Response } from "express";

export default async function deleteStoryController(req: Request, res: Response) {
  const { authorId, storyId } = req.params;

  console.log("Delete request for authorId and storyId: ", authorId, storyId);

  if (!authorId || !storyId) {
    res.status(400).json({
      success: false,
      message: "Author ID and Story ID are required"
    });
    return;
  }

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        id: storyId,
        authorId: Number(authorId)
      }
    });

    if (!existingStory) {
      return res.status(404).json({
        success: false,
        message: "Story not found"
      });
    }

    await prisma.story.delete({
      where: {
        id: storyId
      }
    });

    res.status(200).json({
      success: true,
      message: "Story deleted successfully"
    });
  } catch (error) {
    console.error("Error while deleting story:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the story"
    });
  }
}
