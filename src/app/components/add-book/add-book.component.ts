import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    public bookService: BookService) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field'
      : this.formControl.hasError('email') ? 'Not a valid email'
        : '';
  }

  submit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.bookService.create(this.data);
  }

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
