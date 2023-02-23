import { Router } from "express";
import {
  getRobots,
  getRobotById,
  deleteRobotById,
  createRobot,
} from "../../controllers/robotsControllers.js";
import auth from "../../middlewares/auth.js";

export const robotsRouter = Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:idRobot", getRobotById);
robotsRouter.delete("/delete/:idRobot", auth, deleteRobotById);
robotsRouter.post("/create/", auth, createRobot);
