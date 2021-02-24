import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.sass']
})
export class BookDetailsComponent implements OnInit {
  currentBook: Book = {
    isbn: '',
    bookName: '',
    company: '',
    price: 0,
    genreCode: 0
  };
  message = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getBook(this.route.snapshot.params.id);
  }

  getBook(isbn: string): void {
    this.bookService.get(isbn)
      .subscribe(
        data => {
          this.currentBook = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  updateBook(): void {
    this.bookService.update(this.currentBook.isbn, this.currentBook)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteBook(): void {
    this.bookService.delete(this.currentBook.isbn)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/books']);
        },
        error => {
          console.log(error);
        }
      );
  }

}
