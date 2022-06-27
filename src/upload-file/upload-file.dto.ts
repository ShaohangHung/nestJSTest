import { ApiProperty } from '@nestjs/swagger';

export class UploadOneFileDto {
  @ApiProperty({
    description: 'Attachments',
    format: 'binary',
  })
  file: string[];

  @ApiProperty({})
  fileName: string;
}

export class UploadMultiFileDto {
  @ApiProperty({
    description: 'Attachments',
    type: 'array',
    items: {
      type: 'file',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  files: any[];

  @ApiProperty({})
  tag: string;
}
