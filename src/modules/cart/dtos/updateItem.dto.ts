import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNumber } from 'class-validator';

export class UpdateItemDTO {
  @IsNumber()
  @IsEmpty()
  @ApiProperty({ required: false })
  quantity?: number;

  @IsNumber()
  @IsEmpty()
  @ApiProperty({ required: false })
  price?: number;
}
