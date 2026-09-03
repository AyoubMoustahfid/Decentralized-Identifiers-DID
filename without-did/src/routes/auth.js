import express from "express";
import { login, register } from "../services/authService.js";

const router = express.Router();


router.post("/register", async (req, res) => {
    try{
        const student = await register(req.body)
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})


router.post("/login", async (req, res) => {
    try{
        const token = await login(req.body)

        res.json({accessToken: token})
    } catch (error) {
        res.status(401).json({
            error: error.message
        })
    }
})

export default router
