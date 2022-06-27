import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResFormator } from '../shared/api/api-format-class';
import { UploadMultiFileDto, UploadOneFileDto } from './upload-file.dto';
import { UploadFileService } from './upload-file.service';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post(`one-file`)
  @ApiOperation({
    summary: 'test upload one file',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiTags('default')
  @UseInterceptors(FileInterceptor('file'))
  async uploadOneFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadOneFileDto,
    @Res() res,
  ): Promise<ResFormator> {
    try {
      const result = await this.uploadFileService.saveOneFile(file, body);
      return res
        .status(HttpStatus.OK)
        .json(new ResFormator(result).fullResponse);
    } catch (e) {
      console.log(e);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ResFormator(new Error(e.message)).fullResponse);
    }
  }

  @Post(`multi-file`)
  @ApiOperation({
    summary: 'test upload multiple files',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiTags('default')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultiFile(
    @UploadedFiles() files,
    @Body() body: UploadMultiFileDto,
    @Res() res,
  ): Promise<ResFormator> {
    try {
      const result = await this.uploadFileService.saveMultiFile(files, body);
      return res
        .status(HttpStatus.OK)
        .json(new ResFormator(result).fullResponse);
    } catch (e) {
      console.log(e);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ResFormator(new Error(e.message)).fullResponse);
    }
  }
}
