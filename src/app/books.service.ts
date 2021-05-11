import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books$ = new BehaviorSubject(null);
  search: string = '';

  constructor(private httpClient: HttpClient ) { }
  getBooksByName(name:string){
    return this.httpClient.get("https://www.googleapis.com/books/v1/volumes?q="+name);
  }
  setSearchKeyWord(search:string) {
    this.search = search;
  }
  getSearchKeyWord():string{
    return this.search;
  }
}
