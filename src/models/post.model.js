import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: trusted,
        },

    },
    {
        timestamps: true
    }
)

export const Post = model("Post", postSchema)