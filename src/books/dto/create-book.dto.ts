import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, MaxLength,IsIn } from 'class-validator';
import { IsInt } from 'class-validator';
export class CreateBookDto {
  @ApiProperty({
    example: 'Harry Potter',
    description: 'Название книги',
  })
 

  @IsString()
@IsNotEmpty()
@MinLength(3)
@MaxLength(100)
 title!:string



 

  @IsString()
@IsNotEmpty()
@IsIn(['available', 'taken'])
 status!:string

 @Type(() => Number)
@IsInt()
userId!: number;
}
