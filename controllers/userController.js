import multer from "multer";
import User from "../models/UserSchema.js";
import { passwordHasher } from "../utils/helpers.js";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
}).single('profileImage');

const createUser = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "File upload error" });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { name, email, password } = req.body;
      
      if (!name || !email || !password || !req.file) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await passwordHasher(password);
      
      const user = new User({
        name,
        email,
        password: hashedPassword,
        profileImage: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
      });

      const savedUser = await user.save();
      res.status(201).json({
        message: "User created successfully",
        userId: savedUser._id
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { createUser };