import axios from "axios";
import fs from "node:fs/promises";
import {
    signChallenge
} from "./wallet.js";

const API_URL = "http://localhost:8080";

const authenticate = async () => {

    // 1. Load student's wallet
    const walletFile =
        await fs.readFile(
            "./client/wallet.json",
            "utf-8"
        );

    const wallet =
        JSON.parse(walletFile);

    console.log(
        "Student DID:",
        wallet.did
    );

    // 2. Ask server for challenge
    const challengeResponse =
        await axios.post(
            `${API_URL}/api/did/authenticate/challenge`,
            {
                did: wallet.did
            }
        );

    const {
        challenge
    } = challengeResponse.data;

    console.log(
        "Challenge:",
        challenge
    );

    // 3. Sign challenge locally
    const signature =
        signChallenge(
            wallet.privateKey,
            challenge
        );

    console.log(
        "Challenge signed"
    );

    // 4. Send proof to server
    const verificationResponse =
        await axios.post(
            `${API_URL}/api/did/authenticate/verify`,
            {
                did: wallet.did,
                challenge,
                signature
            }
        );

    const result =
        verificationResponse.data;

    console.log(
        "Authentication result:",
        result
    );
};

authenticate();