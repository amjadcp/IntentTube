import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.send("OK");
});

export default router;
