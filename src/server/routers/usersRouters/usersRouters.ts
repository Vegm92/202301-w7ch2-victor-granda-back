import { validate } from "express-validation";
import { Router } from "express";
import multer from "multer";
import { uuid } from "uuidv4";
import { createUser, loginUser } from "../../controllers/usersControllers.js";
import registerSchema from "../schemas/registerSchemas.js";

const usersRouter = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, callback) {
    const fileNamePrefix = Date.now();
    const fileNameSuffix = uuid();
    callback(null, `${fileNamePrefix}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
const avatarUpload = upload.single("avatar");

usersRouter.post("/login", loginUser);
usersRouter.post(
  "/register",
  avatarUpload,
  validate(registerSchema),
  createUser
);

export default usersRouter;
