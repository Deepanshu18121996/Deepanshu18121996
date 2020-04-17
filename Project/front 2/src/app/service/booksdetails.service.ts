import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
import { Observable } from "rxjs";
import { jsonresponse } from "../pagemodels/jsonresponse";
@Injectable({
  providedIn: "root",
})
export class BooksdetailsService {
  constructor(private http: HttpClient) {}

  bookdetails(data): Observable<jsonresponse> {
    return this.http.get<jsonresponse>(`${url}/get_books_details/${data}`);
  }
}
