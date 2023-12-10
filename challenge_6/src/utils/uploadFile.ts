import { Request } from 'express';
import multer, { StorageEngine } from 'multer';

const imageStorage: StorageEngine = multer.diskStorage({
    // destination: (req: Request, file, cb) => {
    //     cb(null, './public/images');
    // },
    filename: (req: Request, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    }
});

const handleImage = multer({ storage: imageStorage }).single('image_url');

export default handleImage;