import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import storyController from "../controllers/storyController";
import getStoryController from "../controllers/getStoryController";
import getMyStoryController from "../controllers/getMyStoriesController";




const router: Router = Router();


router.post("/story",authMiddleware,storyController)
router.get("/getStory",authMiddleware,getStoryController)
router.get("/getMyStory",getMyStoryController)


export default router;

