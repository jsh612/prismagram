import multer from "multer";

const upload = multer({ dest: "uploads/" });

// single("input태그 name")
export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const {
    file: { path }
  } = req;
  console.log(req.file);
  res.json({ path });
};
