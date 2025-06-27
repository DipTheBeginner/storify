import prisma from "@repo/db/client";
import { Request, Response } from "express";

export default async function getUserStoryController(req: Request, res: Response) {
  if (!req.user) {
    console.log("❌ req.user is missing");
    return res.status(400).json({
      error: "User authentication required",
    });
  }

  const { email } = req.params;
  console.log("📥 Requested email:", email);

  if (!email || typeof email !== "string") {
    console.log("❌ Invalid or missing email");
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
    console.log("👤 User found:", user);
    
    


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

     console.log("📝 Stories fetched:", myStories.length); // ✅ LOG 3: Count of stories
    console.dir(myStories, { depth: null }); // ✅ LOG 4: Actual stories

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
