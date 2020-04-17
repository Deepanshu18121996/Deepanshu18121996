import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class SaveWishlistService {
  constructor(private http: HttpClient) {}

  wishlist(data) {
    return this.http.post(`${url}/wishlist_data`, data);
  }
}
