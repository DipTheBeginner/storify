import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import getStoriesController from "../controllers/getStoriesController";
import likeController from "../controllers/likeController";
import getFullStoryController from "../controllers/getFullStoryController";
import createStoryController from "../controllers/createStoryController";
import editStoryController from "../controllers/editStoryController";
import getUserStoryController from "../controllers/getUserStoryController";

const router: Router = Router();

router.get("/get-story", authMiddleware, getStoriesController);
router.post("/toggle-like", authMiddleware, likeController);
router.get("/full-story/:authorId/:storyId", authMiddleware, getFullStoryController);
router.post("/create-story", authMiddleware, createStoryController);
router.put("/update-story/:storyId", authMiddleware, editStoryController);
router.get("/account-data/:email",authMiddleware,getUserStoryController);

export default router;