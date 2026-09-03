import axios from "axios"
import fs from "node:fs/promises"

const API_URL = "http://localhost:8080"

const createWallet = async () => {
    try {
        const response = await axios.post(`${API_URL}/api/did/create`)

        const wallet = response.data

        await fs.writeFile("./client/wallet.json", JSON.stringify(wallet, null, 2))

        console.log("Wallet created: \n", {did: wallet.did})
    } catch (error) {
        console.error("Error creating wallet:", error.message)
        process.exit(1)
    }
}

createWallet()