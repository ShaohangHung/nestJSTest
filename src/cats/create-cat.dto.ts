import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({ example: `Puppy` })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ example: `brown` })
  @IsNotEmpty()
  @IsString()
  breed: string;
}
