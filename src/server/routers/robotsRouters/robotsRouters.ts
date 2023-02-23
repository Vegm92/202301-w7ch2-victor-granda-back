import { Router } from "express";
import {
  getRobots,
  getRobotById,
  deleteRobotById,
  createRobot,
} from "../../controllers/robotsControllers";
import auth from "../../middlewares/auth";

export const robotsRouter = Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:idRobot", getRobotById);
robotsRouter.delete("/delete/:idRobot", auth, deleteRobotById);
robotsRouter.post("/create/", auth, createRobot);
