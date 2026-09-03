import mongoose from "mongoose"

const credentialSchema = new mongoose.Schema({
    credentialId: {
        type: String,
        require: true,
        unique: true,
    },
    issuer: {
        type: String,
        require: true,
    },
    subjectDid: {
        type: String,
        require: true,
    },
    credentialType: {
        type: String,
        default: "StudentCredential"
    },
    claims: {
        studentId: String,
        university: String,
        status: String
    },
    signature: {
        type: String,
        require: true
    }
}, { timestamps: true })

export const Credential = mongoose.model("Credential", credentialSchema)