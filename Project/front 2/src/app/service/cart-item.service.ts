import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class CartItemService {
  constructor(private http: HttpClient) {}

  get_cart(email) {
    return this.http.get(`${url}/fetch_cart/${email}`);
  }
}
