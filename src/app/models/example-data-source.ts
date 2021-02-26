import { DataSource } from "@angular/cdk/collections";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import { BehaviorSubject, Observable, merge, fromEvent } from "rxjs";
import { map } from 'rxjs/operators';

import { BookService } from "../services/book.service";
import { Book } from "./book.model";

export class ExampleDataSource extends DataSource<Book> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    filteredData: Book[] = [];
    renderedData: Book[] = [];

    constructor(
        public _exampleDatabase: BookService,
        public _paginator: MatPaginator,
        public _sort: MatSort) {

        super();
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }

    connect(): Observable<Book[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page
        ];

        this._exampleDatabase.getAllBooks();

        return merge(...displayDataChanges).pipe(map(() => {
            this.filteredData = this._exampleDatabase.data.slice()
                .filter((book: Book) => {
                    const searchStr = (book.isbn! + book.bookName! + book.company! + book.price! + book.genreCode!)
                        .toLowerCase();
                    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
                });

            const sortedData = this.sortData(this.filteredData.slice());

            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
            return this.renderedData;
        }));
    }

    disconnect() { }

    sortData(data: Book[]): Book[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'isbn': [propertyA, propertyB] = [a.isbn!, b.isbn!];
                    break;
                case 'bookName': [propertyA, propertyB] = [a.bookName!, b.bookName!];
                    break;
                case 'company': [propertyA, propertyB] = [a.company!, b.company!];
                    break;
                case 'price': [propertyA, propertyB] = [a.price!, b.price!];
                    break;
                case 'genreCode': [propertyA, propertyB] = [a.genreCode!, b.genreCode!];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
}
