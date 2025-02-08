import express from "express";
import multer from "multer";
import { downloadFile, uploadFile } from "../controllers/uploadController.js";

const router = express.Router();

// Multer configuration for file upload to disk storage  (uploads/ folder)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg and .png files are allowed"));
    }
  },
});



// Upload route for single file upload (test) with multer middleware
router.post("/upload", upload.single("image"), uploadFile);

// // Upload route for multiple file upload (tests) with multer middleware
// router.post("/upload/multiple", upload.array("image", 3), (req, res) => {
//   console.log(req.body);
//   res.send(req.files);
// });

// Download route to download a file from the server (uploads/ folder)  (test.jpg)  (test.png)
router.get("/download/:id", downloadFile);

export default router;
