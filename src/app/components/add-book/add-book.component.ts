import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.sass']
})
export class AddBookComponent implements OnInit {
  book: Book = {
    isbn: '',
    bookName: '',
    company: '',
    price: 0,
    genreCode: 0
  };
  submitted = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  saveBook(): void {
    const data = {
      isbn: this.book.isbn,
      bookName: this.book.bookName,
      company: this.book.company,
      price: this.book.price,
      genreCode: this.book.genreCode
    };

    this.bookService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      isbn: '',
      bookName: '',
      company: '',
      price: 0,
      genreCode: 0
    };
  }

}
