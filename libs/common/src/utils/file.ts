import { UnsupportedMediaTypeException } from '@nestjs/common';
import { DiskStorageOptions } from 'multer';
import { join } from 'path';
import { checkingFolder } from './fs';

export const checkingImage = (name: string) => {
  return name.match(/^(image)\/(png|jpg|jpeg|webp|svg\+xml)$/) === null
    ? false
    : true;
};

export const diskStorageOptions = {
  destination: async (req, file: Express.Multer.File, cb) => {
    const { storage } = req.query;
    await checkingFolder(
      join(process.cwd(), `/libs/public/${storage.toString().toLowerCase()}`),
    );
    cb(
      null,
      join(process.cwd(), `/libs/public/${storage.toString().toLowerCase()}`),
    );
  },
  filename: (req, file, cb) => cb(null, file.originalname),
} as DiskStorageOptions;

export const fileFilterOptions = (
  file: Express.Multer.File,
  cb: (error: Error, acceptFile: boolean) => void,
) => {
  return checkingImage(file.mimetype)
    ? cb(null, true)
    : cb(
        new UnsupportedMediaTypeException('File image is not valid type'),
        false,
      );
};
