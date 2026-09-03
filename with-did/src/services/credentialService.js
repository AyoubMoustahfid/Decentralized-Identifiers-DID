import crypto from "node:crypto"
import { Credential } from "../models/Credential.js"

const {privateKey, publicKey} = crypto.generateKeyPairSync("ed25519")

export const universityDid = "did:example:university-123"

const universityPublicKey = publicKey
const universityPrivateKey = privateKey


export const issueStudentCredential = async ({studentDid, studentId}) => {
    const credential = {
        id: crypto.randomUUID(),
        type: [
            "VerifiableCredential",
            "StudentCredential"
        ],
        issuer: universityDid,
        credentialSubject: {
            id: studentId,
            studentId,
            university: "Johaness Kepler University",
            status: "active"
        }
    }

    const credentialData = JSON.stringify(credential)

    const signature = crypto.sign(
        null,
        Buffer.from(credentialData),
        universityPrivateKey
    )

    const credentialRecord = await Credential.create({
        credentialId: credential.id,
        issuer: universityDid,
        subjectDid: studentDid,
        credentialType: "StudentCredential",
        claims: {
            studentId,
            university: "Johaness Kepler University",
            status: "active"
        },
        signature: signature.toString("base64")
    })

    return {
        credential,
        signature: signature.toString("base64")
    }
}

export const verifyStudentCredential = async (credential, signature) => {
    const credentialData = JSON.stringify(credential)

    const signatureBuffer = Buffer.from(signature, "base64")

    const isValid = crypto.verify(
        null,
        Buffer.from(credentialData),
        universityPublicKey,
        signatureBuffer
    )

    return isValid
}