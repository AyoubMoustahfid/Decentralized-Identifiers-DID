import axios from "axios";

const API_URL = "http://localhost:8080";

const createWallet = async () => {
    const response = await axios.post(`${API_URL}/api/did/create`)

    if(response.data.error){
        throw new Error(`Error Create Wallet ${response.data.error}`)
    }
    
    return response.data
}

const issueCredential = async (studentDid, studentId) => {
    const response = await axios.post(
        `${API_URL}/api/credentials/issue`,
        {
            studentDid,
            studentId
        }
    )

    if(response.data.error){
        throw new Error(`Error Issue Credential ${response.data.error}`)
    }

    return response.data
}


const verifyCredential = async (credential, signature) => {
    const response = await axios.post(
        `${API_URL}/api/credentials/verify`,
        {
            credential,
            signature
        }
    )

    if(response.data.error){
        throw new Error(`Error Verify Credential ${response.data.error}`)
    }
    return response.data
}

const run = async () => {
    try {
        // console.log("\n ============================")
        // console.log("TEST 1: LEGITIMATE STUDENT")
        // console.log("===============================")

        // const student = await createWallet()

        // console.log("Student DID: ", student.did)

        // const credential = await issueCredential(
        //     student.did,
        //     "STUDENT-001"
        // )

        // console.log("\nCredential: ", JSON.stringify(credential.credential, null, 2))

        // const verification = await verifyCredential(
        //     credential.credential,
        //     credential.signature
        // )

        // console.log("\nVerification:", verification)


        // console.log("\n ============================")
        // console.log("TEST 2: NO CREDENTIAL")
        // console.log("===============================")

        // const fakeStudent = await createWallet()

        // console.log("Fake student DID:", fakeStudent.did)

        // const fakeCredential = {
        //     id: crypto.randomUUID(),
        //     type: [
        //         "VerifiableCredential",
        //         "StudentCredential"
        //     ],
        //     issuer: "did:example:university-123",
        //     credentialSubject: {
        //         id: fakeStudent.did,
        //         studentId: "FAKE-999",
        //         university: "Example University",
        //         status: "active"
        //     }
        // }
        // const fakeSignature = crypto.randomBytes(64).toString("base64")

        // const fakeVerification = await verifyCredential(
        //     fakeCredential,
        //     fakeSignature
        // )

        // console.log("\nVerification: ", fakeVerification)


        console.log("\n ============================")
        console.log("TEST 3: MODIFIED CREDENTIAL")
        console.log("===============================")

        const student = await createWallet()
        const legitimate = await issueCredential(student.did, "STUDENT-001")

        legitimate.credential.credentialSubject.status = "suspended"

        const modifiedVerification = await verifyCredential(
            legitimate.credential,
            legitimate.signature
        )

        console.log("\nVerification: ", modifiedVerification)
        
    } catch (error) {
        console.log("error:", error)
    }
}

run();