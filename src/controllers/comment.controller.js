import { Comment } from "../models/comments.model.js";
import mongoose from "mongoose";

async function createComment(req, res) {
    try {

        const { userId, postId, comment } = req.body

        if (
            !userId ||
            !postId ||
            !comment
        ) {
            return res.status(400).json({
                message: 'UserId ,PostId and comment is required'
            })
        }

        const created = await Comment.create({
            userId,
            postId,
            comment
        })

        if (!created) {
            return res.status(500).json({
                message: 'Something went wrong while creating the comment'
            })
        }

        return res.status(201).json({
            message: 'Comment created Sucessfully.',
            created
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function deleteComment(req, res) {
    try {

        const commentId = req.params.id

        if (!commentId) {
            return res.status(400).json({
                message: 'Comment Id must be required'
            })
        }

        const deleted = await Comment.findByIdAndDelete(commentId)

        if (!deleted) {
            return res.status(500).json({
                message: 'Something went wrong while deleting the comment'
            })
        }

        return res.status(200).json({
            message: 'Comment deleted '
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function updateComment(req, res) {
    try {

        const { comment } = req.body

        const commentId = req.params.id

        if (!comment || !commentId) {
            return res.status(400).json({
                message: 'Comment and commentId are required'
            })
        }

        const updated = await Comment.findByIdAndUpdate(commentId, {
            comment
        }, { new: true })

        if (!updated) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        return res.status(200).json({
            message: 'Comment Updated',
            updated
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function getPostAllComments(req, res) {
    try {

        const postId = req.params.id

        if (!postId) {
            return res.status(400).json({
                message: "Post id must be required"
            })
        }

        const allComments = await Comment.aggregate([
            {
                $match: {
                    postId: new mongoose.Types.ObjectId(postId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {

                    _id: 1,
                    comment: 1,
                    createdAt:1,
                    user: {
                        username:"$user.username",
                        image:"$user.image"
                    }
                }
            }
        ])

        if (allComments.length === 0) {
            return res.status(404).json({
                message: "No comment found for that post"
            })
        }

        return res.status(200).json({
            message: "Comments found sucessfully",
            allComments
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
}

export { createComment, deleteComment, updateComment, getPostAllComments }