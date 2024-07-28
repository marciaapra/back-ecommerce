import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CartItem } from '../entities/cartItem.entity';

export class CreateCartDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  tax: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  items: CartItem[];
}
