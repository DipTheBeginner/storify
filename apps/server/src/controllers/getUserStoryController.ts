import prisma from "@repo/db/client";
import { Request, Response } from "express";

export const getUserStoryController = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    console.log("❌ req.user is missing");
    res.status(400).json({
      error: "User authentication required",
    });
    return;
  }

  const { email } = req.params;
  console.log("📥 Requested email:", email);

  if (!email || typeof email !== "string") {
    console.log("❌ Invalid or missing email");
    res.status(400).json({
      error: "Email is required and must be a string",
    });
    return;
  }
    
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log("👤 User found:", user);
                
    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
      return;
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
      
    console.log("📝 Stories fetched:", myStories.length);
    console.dir(myStories, { depth: null });

    res.status(200).json({
      data: myStories,
    });
     
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

// Also export as default for flexibility
export default getUserStoryController;