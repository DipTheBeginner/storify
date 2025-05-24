import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import storyController from "../controllers/storyController";




const router: Router = Router();


router.post("/story",authMiddleware,storyController)


export default router;

