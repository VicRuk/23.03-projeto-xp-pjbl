import express from "express";
import { getCookies, getCookieById, addCookie, updateCookie, deleteCookie } from "../Controllers/cookies.js";

const router = express.Router();

router.get("/", getCookies);
router.get("/:id", getCookieById);
router.post("/", addCookie);
router.put("/:id", updateCookie);
router.delete("/:id", deleteCookie);

export default router;