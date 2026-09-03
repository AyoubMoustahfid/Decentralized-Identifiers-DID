import dotenv from "dotenv"
import express from "express"

import { connectDatabase } from "./config/database.js"
// WITHOUT DID
import authRoutes from "./without-did/src/routes/auth.js"
import examRoutes from "./without-did/src/routes/exams.js"
// WITH DID
import didRoutes from "./with-did/src/routes/did.js"
// import examDIDRoutes from "./with-did/src/routes/exams.js"
import credentialRoutes from "./with-did/src/routes/credentials.js"


dotenv.config();

const app = express();

app.use(express.json())

app.get("/heath", (req, res) => {
    res.json({
        status: "UP"
    })
})


app.use('/api/auth', authRoutes)
app.use('/api/exams', examRoutes)

// DID routes
app.use('/api/did', didRoutes)
app.use('/api/credentials', credentialRoutes)
// app.use('/api/did-exams', examDIDRoutes)

const start = async () => {
    await connectDatabase()

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
}

start();