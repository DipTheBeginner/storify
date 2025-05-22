import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";




const router: Router = Router();


router.post("/story",authMiddleware)


export default router;

