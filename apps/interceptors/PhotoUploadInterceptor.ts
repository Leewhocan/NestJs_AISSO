import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class PhotoUploadInterceptor extends FileInterceptor('photo', {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            callback(null, `${randomName}${extname(file.originalname)}`);
        },
    }),
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
}) {}
