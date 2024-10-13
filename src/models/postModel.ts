import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
}

export interface IPost extends Document { 
  title: string;
  content: string;
  author: Types.ObjectId;
  comments: IComment[];
}

const CommentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
    minlength: [5,"content must be at least 5 characters long"],
    max: [100,"content must be at most 100 characters long"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
    minlength:[ 5,"title must be at least 5 characters long"],
    max: [100,"title must be at most 100 characters long"],
  },
  content: {
    type: String,
    required: true,
    minlength: [5,"content must be at least 5 characters long"],
    max: [500,"content must be at most 500 characters long"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments:[CommentSchema],
});

export default mongoose.model<IPost>("Post", PostSchema);
