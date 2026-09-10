const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    confirmPassword: { type: String, required: true, minlength: 8 },
    phone: { type: String, required: true, trim: true },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = model("User", userSchema);
module.exports = User;
