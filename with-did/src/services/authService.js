import { createPublicKey, randomBytes, verify } from "node:crypto"

import { AuthChallenge } from "../models/AuthChallenge.js"
import { DID } from "../models/DID.js"

export const createChallenge = async (did) => {
    const didDocument = await DID.findOne({did})

    if(!didDocument){
        throw new Error("Unknown DID")
    }

    const challenge = randomBytes(32).toString("hex")

    await AuthChallenge.create({
        did,
        challenge,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    })

    return challenge;
}

export const verifyAuthentication = async ({did, challenge, signature}) => {
    const authChallenge = await AuthChallenge.findOne({
        did,
        challenge,
        used: false
    })

    if(!authChallenge) {
        throw new Error("Invalid authentication challenge")
    }

    if(authChallenge.expiresAt < new Date()) {
        throw new Error("Authentication challenge expired")
    }

    const didDocument = await DID.findOne({did})

    if(!didDocument){
        throw new Error("Unknown DID")
    }

    const publicKey = createPublicKey(didDocument.publicKey)

    const valid = verify(
        null,
        Buffer.from(challenge),
        publicKey,
        Buffer.from(signature, "base64")
    )

    if(!valid){
        throw new Error("Invalid signature")
    }

    authChallenge.used = true
    
    await authChallenge.save();

    return {
        authenticated: true,
        did
    }
}