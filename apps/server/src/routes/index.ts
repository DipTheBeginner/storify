import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import storyController from "../controllers/storyController";
import getStoryController from "../controllers/getStoryController";
import likeController from "../controllers/likeController";
import getFullStoryController from "../controllers/getFullStoryController";
import createStoryController from "../controllers/createStoryController";
import editStoryController from "../controllers/editStoryController";

const router: Router = Router();

router.post("/story", authMiddleware, storyController);
router.get("/get-story", authMiddleware, getStoryController);
router.post("/toggle-like", authMiddleware, likeController);
router.get("/full-story/:authorId/:storyId", authMiddleware, getFullStoryController);
router.post("/create-story", authMiddleware, createStoryController);
router.put("/update-story/:storyId", authMiddleware, editStoryController);

export default router;