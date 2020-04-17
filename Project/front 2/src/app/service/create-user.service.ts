import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class CreateUserService {
  constructor(private http: HttpClient) {}

  create(data) {
    return this.http.post(`${url}/auth_user`, data);
  }
}
