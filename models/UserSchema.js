import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: Buffer,
    required: false,
    ref: "ProfileImage",
    // Reference to the ProfileImage model (one-to-one relationship)
  },
});

const profileImage = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const ProfileImage = mongoose.model("ProfileImage", profileImage);

const User = mongoose.model("User", userSchema);

export default { User, ProfileImage };
