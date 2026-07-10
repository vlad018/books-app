import { Injectable, } from '@nestjs/common';
import { QueryBooksDto } from './dto/query-books.dto';


import{CreateBookDto} from './dto/create-book.dto';

@Injectable()
export class BooksService {


private books = [
  {
    id: 1,
    title: 'Harry Potter',
    status: 'available',
    userId: 1,
    createdAt: '2026-07-01',
  },
  {
    id: 2,
    title: 'Metro 2033',
    status: 'taken',
    userId: 2,
    createdAt: '2026-07-03',
  },
  {
    id: 3,
    title: '1984',
    status: 'available',
    userId: 1,
    createdAt: '2026-07-04',
  },
];
create(dto:CreateBookDto){
    const newId= this.books.length + 1

    const newBook={
      id:newId,
      title:dto.title,
       status:dto.status,
       userId:dto.userId,
       createdAt:new Date().toISOString().split('T')[0]
    }
    this.books.push(newBook)
    return newBook
    

}




  findAll(query: QueryBooksDto) {
    const {
   
      search = '',
    

    } = query;

    let result = this.books;


    
    



    if(search){
        result=result.filter(books => 
            books.title.toLowerCase().includes(search.toLowerCase())
        )
    }

return result;


  }
  
    
 myBooks(userId: number) {
    
     return this.books.filter((book) => {
        return book.userId === userId
     })
 }

}

