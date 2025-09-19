import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    const randomSuffix = crypto.randomUUID();
    const fileExtension = path.extname(file.originalname);
    cb(null, randomSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

export default upload;
