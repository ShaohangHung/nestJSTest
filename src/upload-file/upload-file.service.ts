import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { UploadMultiFileDto, UploadOneFileDto } from './upload-file.dto';

@Injectable()
export class UploadFileService {
  async saveOneFile(file: Express.Multer.File, body: UploadOneFileDto) {
    const fileBase64 = file.buffer.toString('base64');
    const originalFileName = file.originalname;
    const fileType = originalFileName.split(`.`)[1];
    fs.writeFileSync(
      `${body.fileName}.${fileType}`,
      Buffer.from(fileBase64, `base64`),
    );
    return {};
  }

  async saveMultiFile(files, body: UploadMultiFileDto) {
    files.forEach((file) => {
      const fileBase64 = file.buffer.toString('base64');
      const originalFileName = file.originalname;
      fs.writeFileSync(
        `${body.tag}_${originalFileName}`,
        Buffer.from(fileBase64, `base64`),
      );
    });
    return {};
  }
}
