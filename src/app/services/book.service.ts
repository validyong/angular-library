import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

const baseUrl = 'http://192.168.0.58:4200/api/books';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(baseUrl);
  }

  get(id: string): Observable<Book> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(isbn: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${isbn}`, data);
  }

  delete(isbn: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${isbn}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByBookName(bookName: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${baseUrl}?bookName=${bookName}`);
  }
}
