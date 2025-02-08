import User from "../models/userModel.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
}).single("profileImage");

const createUser = async (req, res) => {
  // Multer configuration for file upload to disk storage  (uploads/ folder)
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ message: err.message });
      }

      const emailExist = await User.findOne({
        email: req.body.email,
      });
      if (emailExist) {
        return res.status(400).send({ message: "Email already exists" });
      }
      const hashedPassword = passwordHasher(req.body.password);
      
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        profileImage: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
          uploadedAt: new Date(),
        },
      }); // Create a new user instance with the request data
      const savedUser = await user.save();
      res.status(201).json({
        message: "User created successfully",
        data: {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            profileImage: savedUser.profileImage,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ password: 0 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createUser, getUsers };
