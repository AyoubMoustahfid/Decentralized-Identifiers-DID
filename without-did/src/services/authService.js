import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Student } from "../models/Student.js";


export const register = async ({name, email, password}) => {
    const existingStudent = await Student.findOne({email})

    if(existingStudent) {
        throw new Error("Student already exists")
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const student = await Student.create({name, email, passwordHash})

    return {
        id: student._id,
        name: student.name,
        email: student.email
    }
}

export const login = async ({email, password}) => {
    const student = await Student.findOne({email})

    if(!student){
        throw new Error("Invalid credentials")
    }

    const passwordValid = await bcrypt.compare(password, student.passwordHash)

    if(!passwordValid){
        throw new Error("Invalid credentials")
    }

    const token = jwt.sign(
        {
            sub: student._id.toHexString(),
            role: student.role,
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    )

    return token;
}
