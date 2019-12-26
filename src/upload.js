import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "jsh-prismagram",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

// single("input태그 name")
export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const {
    file: { location }
  } = req;
  res.json({ location });
};
