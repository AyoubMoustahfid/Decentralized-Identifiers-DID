import mongoose from "mongoose";
 

const didSchema = new mongoose.Schema({
    did: {
        type: String,
        require: true,
        unique: true
    },
    publicKey: {
        type: String,
        require: true,
    },
    algorithm: {
        type: String,
        require: true,
        default: "Ed25519"
    }
}, { timestamps: true })

export const DID = mongoose.model("DID", didSchema)