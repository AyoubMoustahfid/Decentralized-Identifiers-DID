import express from "express"

import { issueStudentCredential, verifyStudentCredential } from "../services/credentialService.js"

const router = express.Router()

router.post("/issue", async (req, res) => {
    try{
        const {studentDid, studentId} = req.body
        
        const result = await issueStudentCredential({
            studentDid,
            studentId
        })

        res.json(result)
    }catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Failes to issue credential"
        })
    }
})


router.post("/verify", async (req, res) => {
    try{
        const {credential, signature} = req.body

        const valid = await verifyStudentCredential(
            credential,
            signature
        )

        res.json({valid})
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to verify credential"
        })
    }
})

export default router;