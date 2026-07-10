import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BooksService } from './books.service';
import { QueryBooksDto } from './dto/query-books.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { Body } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { UserDto } from './dto/User.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Books')
@ApiBearerAuth()

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: QueryBooksDto) {
    return this.booksService.findAll(query);
  }
@UseGuards(JwtAuthGuard)
@Post()
create(@Body()dto:CreateBookDto){
  return this.booksService.create(dto)
}
@Get('test')
test() {
  return {
    message: 'hello',
  };

}
@Get("my-books")
@UseGuards(JwtAuthGuard)
myBooks(@Request() req) {
  return this.booksService.myBooks(req.user.id);
}
@Post('test')
creates(@Body() dto: UserDto) {
  console.log(dto);
  console.log(typeof dto.age);

  return dto;
}

}
