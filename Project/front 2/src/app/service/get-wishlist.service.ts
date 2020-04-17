import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class GetWishlistService {
  constructor(private http: HttpClient) {}

  get_wishlist(email) {
    return this.http.get(`${url}/fetch_wishlist/${email}`);
  }
}
