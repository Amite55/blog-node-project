// title, body, author, tags, thumbnail, readTime, likes, deLikes, comments,

const { Schema, model } = require("mongoose");
const Comment = require("./Comments");
const User = require("./User");

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    body: { type: String, required: true, trim: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    thumbnail: String,
    links: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
    disLikes: [{ type: Schema.Types.ObjectId, ref: User }],
    readTime: String,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: Comment,
      },
    ],
  },
  { timestamps: true },
);

const Post = model("Post", postSchema);
module.exports = Post;
