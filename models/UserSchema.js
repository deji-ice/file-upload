import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  profileImage: {
    data: Buffer,
    contentType: String,
    uploadedAt: { 
      type: Date, 
      default: Date.now 
    }
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User; 