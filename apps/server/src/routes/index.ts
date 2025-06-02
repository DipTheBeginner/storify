import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import storyController from "../controllers/storyController";
import getStoryController from "../controllers/getStoryController";
import likeController from "../controllers/likeController";
import getUserStoryController from "../controllers/getMyStoriesController";
import getFullStoryController from "../controllers/getFullStoryController";




const router: Router = Router();


router.post("/story",authMiddleware,storyController)
router.get("/get-story",authMiddleware,getStoryController)
router.get("/get-user-story",getUserStoryController)
router.post("/toggle-like",authMiddleware,likeController)
router.get("/full-story/:authorId/:storyId",authMiddleware,getFullStoryController)


export default router;

