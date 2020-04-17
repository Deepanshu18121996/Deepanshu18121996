import { Injectable } from "@angular/core";
import { url } from "../manual/url";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class NotesService {
  constructor(private http: HttpClient) {}
  addNotes(data) {
    return this.http.post(`${url}/addnotes`, data);
  }
  fetchcategory() {
    return this.http.get(`${url}/fetchnotes`);
  }
}
