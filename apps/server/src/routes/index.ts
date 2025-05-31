import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import storyController from "../controllers/storyController";
import getStoryController from "../controllers/getStoryController";
import likeController from "../controllers/likeController";
import getUserStoryController from "../controllers/getMyStoriesController";




const router: Router = Router();


router.post("/story",authMiddleware,storyController)
router.get("/get-Story",authMiddleware,getStoryController)
router.get("/get-user-story",getUserStoryController)
router.post("/toggle-like",authMiddleware,likeController)


export default router;

