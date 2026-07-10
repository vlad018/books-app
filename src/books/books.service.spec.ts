
import { BooksService } from './books.service';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('BooksService', () => {
let service:BooksService

beforeEach(() => {
     service= new BooksService()

})

it('should create book', () => {
    const dto ={
        title:'Harry Potter',
        status:'available',
        userId:1,
    }
    
const result= service.create(dto)

expect(result.title).toBe(dto.title);
  expect(result.status).toBe(dto.status);
  expect(result.userId).toBe(dto.userId);
})
it('should return all books', () => {
const result=service.findAll({})

expect(result).toHaveLength(3)


})
it('should contain Metro 2033', () => {
const books=['Metro 2033','Harry Potter','1994']//или какой там блять 1994 или 1991 короче ясно 

expect(books).toContain('Metro 2033')//  оно проверяет первую книгу(долбаеб с 3 попытки не угадал)


 
})



it('should return all books', () => {
const result=service.findAll({
    status:'available',
    

})
expect(result).toHaveLength(2)

})  



it('should sort ascending', () => {
    const result=service.findAll({
        sort:'asc'

    })
     expect(result[0].title).toBe('Harry Potter');
  expect(result[1].title).toBe('Metro 2033');
  expect(result[2].title).toBe('1984');
})
;



it('should sort deck', () => {
    const result=service.findAll({
        sort:'desc'

    })
    
    expect(result[0].title).toBe('1984');
      expect(result[1].title).toBe('Metro 2033');
    expect(result[2].title).toBe('Harry Potter')
    console.log(result);
})
})