import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UserDto {
  @Type(() => Number)
  @IsNumber()
  age!: number;
}