import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddItemDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  image: string;
}
