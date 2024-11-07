import mongoose from "mongoose";
import { Likes } from "../models/postLikes.model.js";

async function addLikes(req, res) {
    try {
        const { userId, postId } = req.body

        if (!userId || !postId) {
            return res.status(400).json({
                message: "UserId and PostId must be required"
            })
        }

        const likeCreated = await Likes.create({
            postId, userId
        })

        if (!likeCreated) {
            return res.status(500).json({
                message: "error in adding a like"
            })
        }

        return res.status(201).json({
            message: "Like added sucessfully",
            likeCreated
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}


async function deleteLike(req, res) {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Id must be required."
            })
        }

        const unLike = await Likes.findByIdAndDelete(id)

        if (!unLike) {
            return res.status(500).json({
                message: "error in unliking"
            })
        }

        return res.status(200).json({
            message: "Post unlike sucessfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "error in unlike",
            error: error.message
        })
    }
}

async function getPostLikes(req, res) {
    try {

        const { postId } = req.params

        if (!postId) {
            return res.status(400).json({
                message: "postId must be required"
            })
        }

        const getLikes = await Likes.aggregate([
            {
                $match: {
                    postId: new mongoose.Types.ObjectId(postId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userData'
                }

            },
            {
                $unwind: "$userData"
            },
            {
                $project: {
                    _id: 1,
                    username: "$userData.username",
                    profileImage: "$userData.image"
                }
            }
        ])

        if (getLikes.length === 0) {
            return res.status(404).json({
                message: "No likes found"
            })
        }

        return res.status(200).json({
            message: "Likes found",
            likes: getLikes
        })

    } catch (error) {
        return res.status(500).json({
            message: 'error in getting post likes',
            error: error.message
        })
    }
}

export { addLikes, deleteLike, getPostLikes }