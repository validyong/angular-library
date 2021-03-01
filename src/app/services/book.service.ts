import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book.model';

const baseUrl = 'http://192.168.0.58:8080/api/books';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  dataChange: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  dialogData: any;

  getDialogData() {
    return this.dialogData;
  }

  get data(): Book[] {
    return this.dataChange.value;
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(baseUrl);
  }

  getAllBooks(): void {
    this.http.get<Book[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  get(isbn: string): Observable<any> {
    return this.http.get(`${baseUrl}/${isbn}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(isbn: any, data: any): Observable<any> {
    console.log("update" + isbn);
    return this.http.put(`${baseUrl}/${isbn}`, data);
  }

  delete(isbn: any): Observable<any> {
    console.log("delete" + isbn);
    return this.http.delete(`${baseUrl}/${isbn}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByBookName(bookName: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${baseUrl}?bookName=${bookName}`);
  }
}
