import { User } from "../models/user.model.js";

async function createUser(req, res) {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const createUser = await User.create({
            username, email, password
        })

        if (!createUser) {
            return res.status(500).json({
                message: 'Something went wrong while creating the user'
            })
        }

        return res.status(201).json({
            message: 'User created sucessfully'
        })



    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// async function login(req,res){
//     try {
//         const 
//     } catch (error) {
//         return res.status(500).json({
//             message:'Internal server error'
//         })
//     }
// }

export {createUser}