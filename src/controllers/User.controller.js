import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

async function createUser(req, res) {
    try {
        const { firstName, lastName, email, password, gender, dateOfBirth } = req.body;
        console.log("req.body", req.body)
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !gender ||
            !dateOfBirth
        ) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const checkUser = await User.findOne({
            $or: [
                {
                    firstName: firstName,
                    lastName: lastName
                },
                { email: email }
            ]
        });

        if (checkUser) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                gender,
                dateOfBirth
            }
        )

        if (!createdUser) {
            return res.status(500).json({
                message: "Something went wrong while creating the user"
            })
        }

        return res.status(201).json({
            message: "User created sucessfully",
            createdUser
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function loginUser(req, res) {
    try {

        const { email, password } = req.body

        if (
            !email ||
            !password
        ) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const isUser = await User.findOne({
            email: email,
        })

        if (!isUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, isUser.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            })
        }

        const token = jwt.sign(
            {
                id: isUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_Expiry
            }
        )

        return res.status(200).json({
            message: "User loggind sucessfully",
            token
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function logout(req, res) {
    try {
        const { userData } = req.body
        if (!userData) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

    }
    catch (error) {
           return res.status(500).json({
            message:"Internal server error",
            error:error.message
           })
    }
}


export { createUser, loginUser }