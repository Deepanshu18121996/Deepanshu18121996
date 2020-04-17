import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class RemoveWishService {
  constructor(private http: HttpClient) {}

  remove(id) {
    return this.http.get(`${url}/remove_wishlist_item/${id}`);
  }
}
