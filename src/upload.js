import multer from "multer";

const upload = multer({ dest: "uploads/" });

// single("input태그 name")
export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const { file } = req;
  console.log("upload.js :", file);
  res.end();
};
