import { Post } from "../models/post.model";

async function createPost(req, res) {
    try {

        const { description, image, createdBy } = req.body

        if (!description ||
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
        if (!id) {
            return res.status(400).json({
                message: 'Id must be required'
            })
        }

        const deleted = await Post.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(500).json({
                message: 'Something went wrong while deleting the post'
            })
        }

        return res.status(200).json({
            message: 'Post deleted sucessfully'
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

async function getAllPostOfUser(req,res){
    try {
        
    } catch (error) {

        return res.status(500).json({
            message:'Internal server error'
        })
        
    }
}

export {createPost,updatePost,deletePost}