const { Schema, model } = require("mongoose");
const Profile = require("./profile");

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 30 },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  profile: {
    type: Schema.Types.ObjectId,
    ref: Profile,
  },
  timestamps: true,
});

const User = model("User", userSchema);
module.exports = User;
