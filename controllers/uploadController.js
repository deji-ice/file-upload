import FileUpload from "../models/fileUploadSchema.js";

const uploadFile = async (req, res) => {
  try {
    const file = new FileUpload({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer,
    });

    const savedFile = await file.save();
    res.status(201).json({
      success: true,
      fileId: savedFile._id,
      data: savedFile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await FileUpload.findById(req.params.id);
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
    res.set({
      "Content-Type": file.contentType,
      "Content-Length": file.size,
      // download the file with the original name
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    });
    res.send(file.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { uploadFile, downloadFile };
