const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    title: { type: String, trim: true, maxlength: 100 },
    bio: { type: String, trim: true, maxlength: 500 },
    profileImage: { type: String, trim: true },
    links: {
      facebook: { type: String, trim: true },
      twitter: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, trim: true, minlength: 30 },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true },
);

const Profile = model("Profile", profileSchema);
module.exports = Profile;
