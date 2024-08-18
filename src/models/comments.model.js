import { Schema, model } from "mongoose";


const commentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        comment: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)


export const Comment = model("Comment", commentSchema)