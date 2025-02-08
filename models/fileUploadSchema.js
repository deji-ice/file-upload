import mongoose from "mongoose";

const fileUploadSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const FileUpload = mongoose.model("FileUpload", fileUploadSchema);

export default FileUpload;
