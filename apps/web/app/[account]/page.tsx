import prisma from "@repo/db/client";
import { Request, Response } from "express";

export default async function getUserStoryController(req: Request, res: Response) {
  try {
    let email = req.params.email;
    
    // Add better email validation and formatting
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }
    
    // Only add @gmail.com if email doesn't contain @ symbol
    if (!email.includes("@")) {
      email += "@gmail.com";
    }
    
    console.log("Fetching user data for email:", email);
    
    const story = await prisma.user.findUnique({
      where: {
        email: email
      },
      include: {
        story: true,
        followers: true,
        following: true,
      }
    });
    
    if (!story) {
      return res.status(404).json({ error: "User not found" });
    }
    
    console.log("User data found:", story);
    
    // Actually return the response
    return res.status(200).json({
      success: true,
      data: story
    });
    
  } catch (error) {
    console.error("Error in getUserStoryController:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}