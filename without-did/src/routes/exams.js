import express from "express";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();


router.get("/", authenticate, async (req, res) => {
    res.json({
        message: "Welcome to the exam platform",
        studentId: req.user.sub,
        exams: [
            {
                id: "distributed-systems-101",
                title: "Distributed Systems",
                durationMinutes: 90
            },
            {
                id: "backend-101",
                title: "Backend Engineering",
                durationMitunes: 60
            }
        ]
    })
})

export default router;