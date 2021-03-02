import { Component, ComponentFactory, ElementRef, OnInit, ViewChild } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { AddBookComponent } from '../add-book/add-book.component';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { ExampleDataSource } from 'src/app/models/example-data-source';
import { fromEvent } from 'rxjs';

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

  displayedColumns = ['isbn', 'bookName', 'company', 'price', 'genreCode', 'actions'];
  exampleDatabase!: BookService | null;
  dataSource!: ExampleDataSource | null;
  index!: number;
  isbn!: string;

  constructor(
    public httpClient: HttpClient,
    public bookService: BookService,
    public dialogService: MatDialog) { }

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild('filter', { static: true })
  filter!: ElementRef;

  ngOnInit(): void {
    this.loadData();
  }

  rerload() {
    this.loadData();
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddBookComponent, {
      data: { book: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("afterClosed AddDialog");
      if (result === 1) {
        this.exampleDatabase?.dataChange.value.push
          (this.bookService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, isbn: string, bookName: string, company: string,
    price: number, genreCode: number) {
    this.isbn = isbn;

    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialogService.open(EditBookComponent, {
      data: {
        isbn: isbn, bookName: bookName, company: company,
        price: price, genreCode: genreCode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("afterClosed EditDialog");

      if (result === 1) {
        const foundIndex =
          this.exampleDatabase!.dataChange.value.findIndex((x: Book) => x.isbn === this.isbn);
        this.exampleDatabase!.dataChange.value[foundIndex] =
          this.bookService.getDialogData();
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, isbn: string, bookName: string, company: string,
    price: number, genreCode: number) {
    this.index = i;
    this.isbn = isbn;
    const dialogRef = this.dialogService.open(DeleteBookComponent, {
      data: { isbn: isbn, bookName: bookName, company: company, price: price, genreCode: genreCode }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("afterClosed DeleteDialog");

      if (result === 1) {
        const foundIndex =
          this.exampleDatabase?.dataChange.value.findIndex(x => x.isbn === this.isbn);
        this.exampleDatabase?.dataChange.value.splice(foundIndex!, 1);
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new BookService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase,
      this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
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
