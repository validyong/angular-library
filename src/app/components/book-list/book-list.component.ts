import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { AddBookComponent } from '../add-book/add-book.component';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { ExampleDataSource } from 'src/app/models/example-data-source';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass']
})
export class BookListComponent implements OnInit {
  books?: Book[];
  currentBook?: Book;
  currentIndex = -1;
  bookName = '';

  displayedColumns = ['isbn', 'bookName', 'company', 'price', 'genreCode'];
  exampleDatabase!: BookService | null;
  dataSource!: ExampleDataSource | null;
  index!: number;
  isbn!: string;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.retrieveBooks();
  }

  rerload() {
    this.retrieveBooks();
  }

  retrieveBooks(): void {
    this.bookService.getAll()
      .subscribe(
        data => {
          this.books = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  refreshList(): void {
    this.retrieveBooks();
    this.currentBook = undefined;
    this.currentIndex = -1;
  }

  setActiveBook(book: Book, index: number): void {
    this.currentBook = book;
    this.currentIndex = index;
  }

  removeAllBooks(): void {
    this.bookService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchBookName(): void {
    this.bookService.findByBookName(this.bookName)
      .subscribe(
        data => {
          this.books = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
