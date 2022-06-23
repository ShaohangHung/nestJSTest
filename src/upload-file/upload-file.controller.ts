import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResFormator } from '../shared/api/api-format-class';
import { UploadOneFileDto } from './upload-file.dto';
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
      const result = await this.uploadFileService.test();
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
