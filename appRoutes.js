import express from "express";
import {login, invite} from "./appControllers.js";

const router = express.Router();

router.post("/login", login);

router.post("/invite", invite);

export default router;