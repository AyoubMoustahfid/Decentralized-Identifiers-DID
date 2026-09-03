import { createPrivateKey, sign } from "node:crypto"

export const signChallenge = (privateKeyPem, challenge) => {
    const privateKey = createPrivateKey(privateKeyPem)

    const signature = sign(
        null,
        Buffer.from(challenge),
        privateKey
    )

    return signature.toString("base64")
}