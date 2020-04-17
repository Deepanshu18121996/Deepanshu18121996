import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
import { Observable } from "rxjs";
import { jsonresponse } from "../pagemodels/jsonresponse";
@Injectable({
  providedIn: "root",
})
export class BestSellerService {
  constructor(private http: HttpClient) {}

  bestSeller(): Observable<jsonresponse> {
    return this.http.get<jsonresponse>(`${url}/best_seller`);
  }
}
