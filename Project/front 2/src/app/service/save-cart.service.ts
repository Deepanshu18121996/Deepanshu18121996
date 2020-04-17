import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class SaveCartService {
  constructor(private http: HttpClient) {}

  cart(data) {
    return this.http.post(`${url}/cart_data`, data);
  }
}
