import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ example: `Puppy` })
  name: string;

  @ApiProperty({ example: 3 })
  age: number;

  @ApiProperty({ example: `brown` })
  breed: string;
}
