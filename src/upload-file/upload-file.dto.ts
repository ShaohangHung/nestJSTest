import { ApiProperty } from '@nestjs/swagger';

export class UploadOneFileDto {
  @ApiProperty({
    description: 'Attachments',
    format: 'binary',
  })
  file: string;

  @ApiProperty({})
  name: string;
}
