import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PostWebhookDto {
  @ApiProperty({
    description: '',
    example: 'page',
  })
  @IsNotEmpty()
  @IsString()
  object: string;

  @ApiProperty({
    description: '',
    example: [{ messaging: [{ message: 'TEST_MESSAGE' }] }],
  })
  @IsNotEmpty()
  @IsArray()
  entry: Record<string, any>[];
}
