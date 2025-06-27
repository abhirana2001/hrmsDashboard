import multer from "multer";

multer;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, `./uploads`);
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
