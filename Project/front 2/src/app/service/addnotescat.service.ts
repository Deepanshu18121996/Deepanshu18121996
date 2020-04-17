import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";

@Injectable({
  providedIn: "root",
})
export class AddnotescatService {
  constructor(private http: HttpClient) {}
  addnotescat(data) {
    return this.http.post(`${url}/addnotescategory`, data);
  }
}
