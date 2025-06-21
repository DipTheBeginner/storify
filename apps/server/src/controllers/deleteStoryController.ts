// import { Router } from "express";
// import authMiddleware from "../middleware/authMiddleware";
// import prisma from "../lib/prisma"; // or wherever your Prisma client is

// const router = Router();

// router.delete("/story/:id", authMiddleware, async (req, res) => {
//   const storyId = Number(req.params.id);
//   const userId = req.user.id;

//   if (isNaN(storyId)) {
//     return res.status(400).json({ error: "Invalid story ID" });
//   }

//   try {
//     const existingStory = await prisma.story.findUnique({
//       where: { id: storyId },
//     });

//     if (!existingStory) {
//       return res.status(404).json({ error: "Story not found" });
//     }

//     if (existingStory.userId !== userId) {
//       return res.status(403).json({ error: "Not authorized to delete this story" });
//     }

//     await prisma.story.delete({
//       where: { id: storyId },
//     });

//     res.status(200).json({ message: "Story deleted successfully" });
//   } catch (error) {
//     console.error("Delete story error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;
