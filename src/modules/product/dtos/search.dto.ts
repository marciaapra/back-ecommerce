import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchDTO {
  @IsString()
  @ApiProperty({ required: false })
  search: string;
}
