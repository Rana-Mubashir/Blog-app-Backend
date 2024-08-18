import { Post } from "../models/post.model.js";
import mongoose from "mongoose";
import { Comment } from "../models/comments.model.js";

async function createPost(req, res) {
    try {

        const { description, image, createdBy } = req.body

        if (
            !description ||
            !createdBy
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const created = await Post.create({
            description, image, createdBy
        })

        if (!created) {
            return res.status(500).json({
                message: 'Something went wrong while creating the post'
            })
        }

        return res.status(201).json({
            message: 'Post created Sucessfully',
            created
        })


    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function deletePost(req, res) {
    try {
        const id = req.params.id
        console.log("id", id)
        if (!id) {
            return res.status(400).json({
                message: 'Id must be required'
            })
        }

        const deleted = await Post.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                message: 'Post not found!'
            })
        }

        const deletedComments = await Comment.deleteMany({
            postId: id
        })

        return res.status(200).json({
            message: 'Post  and comments deleted sucessfully'
        })


    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function updatePost(req, res) {
    try {
        const id = req.params.id;
        const { description, image } = req.body

        if (!description) {
            return res.status(400).json({
                message: 'Description must be requried'
            })
        }

        if (!id) {
            return res.status(400).json({
                message: 'Id must be required'
            })
        }

        const updated = await Post.findByIdAndUpdate(id, { description, image }, { new: true })

        if (!updated) {
            return res.status(500).json({
                message: 'Something went wrong while updating the post',
            })
        }

        return res.status(200).json({
            message: 'Updated sucessfully',
            updated
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function getAllPosts(req, res) {
    try {
        const allPosts = await Post.aggregate(
            [
                {
                    $lookup: {
                        from: "users",
                        localField: "createdBy",
                        foreignField: "_id",
                        as: "userData"
                    },
                },
                {
                    $unwind: "$userData"
                },
                {
                    $lookup: {
                        from: "comments",
                        localField: "_id",
                        foreignField: "postId",
                        as: "postComment",
                    }
                },
                {
                    $unwind: "$postComment"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "postComment.userId",
                        foreignField: "_id",
                        as: "commentBy"
                    }
                },
                {
                    $unwind: "$commentBy"
                },
                {
                    $project: {
                        _id: 1,
                        description: 1,
                        image: 1,
                        createdAt: "$userData.createdAt",
                        username: "$userData.username",
                        profileImage: "$userData.image",
                        comment:
                        {
                            _id: "$postComment._id",
                            comment: "$postComment._comment",
                            createdAt: "$postComment.createdAt",
                            username: "$commentBy.username",
                            profileImage: "$commentBy.image"
                        }

                    }
                },
            ]
        )

        if (!allPosts) {
            return res.status(404).json({
                message: "No Posts found"
            })
        }

        return res.status(200).json({
            message: "Posts found sucessfully",
            allPosts
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getUserAllPosts(req, res) {
    try {

        const userId = req.params.id

        if (!userId) {
            return res.status(400).json({
                message: "UserId must be required"
            })
        }

        const userPosts = await Post.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "userData",
                },
            },
            {
                $unwind: "$userData",
            },
            {
                $project: {
                    _id: 1,
                    description: 1,
                    image: 1,
                    createdAt: 1,
                    userData: {
                        username: "$userData.username",
                        image: "$userData.image"
                    }
                }
            }

        ])

        if (userPosts.length === 0) {
            return res.status(404).json({
                message: "No posts found"
            })
        }

        return res.status(200).json({
            message: "UserPosts found",
            userPosts
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export { createPost, updatePost, deletePost, getAllPosts, getUserAllPosts }