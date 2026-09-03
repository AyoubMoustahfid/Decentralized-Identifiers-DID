import { generateKeyPairSync } from "node:crypto"
import { DID } from "../models/DID.js"

export const createDID = async () => {
    const {publicKey, privateKey} = generateKeyPairSync("ed25519")

    const did = `did:example:${crypto.randomUUID()}`

    const publicKeyPem = publicKey.export({
        type: "spki",
        format: "pem"
    })

    const privateKeyPem = privateKey.export({
        type: "pkcs8",
        format: "pem"
    })

    await DID.create({
        did,
        publicKey: publicKeyPem
    })

    return {
        did,
        publicKey,
        privateKey: privateKeyPem
    }
}

export const resolveDID = async (did) => {
    const document = await DID.findOne({did})

    if(!document) {
        return null
    }

    return {
        id: document.did,
        verificationMethod: [
            {
                id: `${document.did}#key-1`,
                type: "Ed25519VerificationKey",
                controller: document.did,
                publicKeyPem: document.publicKey
            }
        ],
        authentication: [
            `${document.did}#key-1`
        ]
    }
}