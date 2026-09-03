import mongoose from "mongoose"

const authChallengeScheam = new mongoose.Schema({
    did: {
        type: String,
        require: true
    },
    challenge: {
        type: String,
        require: true,
    },
    expiresAt: {
        type: Date,
        require: true,
    },
    used: {
        type: Boolean,
        default: false
    }
})


export const AuthChallenge = mongoose.model("AuthChallenge", authChallengeScheam)