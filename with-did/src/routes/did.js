import express from "express"

import { createChallenge, verifyAuthentication } from "../services/authService.js"
import { createDID, resolveDID } from "../services/didService.js"

const router = express.Router()

router.post("/create", async (req, res) => {
    try {
        const result = await createDID();

        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.get("/:did", async (req, res) => {
    const document = await resolveDID(req.params.did)

    if(!document){
        return res.status(404).json({
            error: "DID not found"
        })
    }

    res.json(document)
})

router.post("/authenticate/challenge", async (req, res) => {
    try{
        const challenge = await createChallenge(req.body.did)
        res.json({challenge})
    } catch(error) {
        res.status(400).json({
            error: error.message
        })
    }
})

router.post("/authenticate/verify", async (req, res) => {
    try{
        const result = await verifyAuthentication(req.body)

        res.json(result);
    } catch (error) {
        res.status(401).json({
            error: error.message
        })
    }
})

export default router