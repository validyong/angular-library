import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/models/book.model';

import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.sass']
})
export class EditBookComponent implements OnInit {
  currentBook: Book = {
    isbn: '',
    bookName: '',
    company: '',
    price: 0,
    genreCode: 0
  };
  message = '';

  constructor(
    public dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bookService: BookService
  ) { }

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

  stopEdit(): void {
    this.currentBook = this.data;
    console.log("stopEdit()" + this.data.isbn);
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

  ngOnInit(): void {
  }

}
