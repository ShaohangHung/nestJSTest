import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetWebhookDto {
  @ApiProperty({
    description: '',
    example: 'subscribe',
  })
  @IsNotEmpty()
  @IsString()
  'hub.mode': string;

  @ApiProperty({
    description: '',
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  'hub.verify_token': string;

  @ApiProperty({
    description: '',
    example: `CHALLENGE_ACCEPTED`,
  })
  @IsNotEmpty()
  @IsString()
  'hub.challenge': string;
}
