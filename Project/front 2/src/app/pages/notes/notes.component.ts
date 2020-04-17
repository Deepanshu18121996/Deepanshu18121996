import { Component, OnInit } from "@angular/core";
import { DetailsService } from "../../service/details.service";
import { BestSellerService } from "../../service/best-seller.service";
import { Observable } from "rxjs";
import { async } from "@angular/core/testing";
import { BooksdetailsService } from "src/app/service/booksdetails.service";
import { map } from "rxjs/operators";
import { jsonresponse } from "src/app/pagemodels/jsonresponse";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"],
})
export class NotesComponent implements OnInit {
  book_categories$: Observable<jsonresponse>;
  best_books$: Observable<jsonresponse>;

  constructor(
    private category_name: DetailsService,
    private best_seller: BestSellerService,
    private bookDetail: BooksdetailsService
  ) {}
  books_d$() {
    this.book_categories$ = this.category_name
      .details()
      .pipe(map((x) => x.cdata));
  }
  best_s$() {
    this.best_books$ = this.best_seller.bestSeller().pipe(map((x) => x.cdata));
  }

  ngOnInit() {
    this.books_d$();
    this.best_s$();
    this.book_categories$.subscribe((x) => console.log(x));
    this.best_books$.subscribe((x) => console.log(x));
  }

  reloadBestCategories(categoryName) {
    this.best_books$ = this.bookDetail
      .bookdetails(categoryName)
      .pipe(map((x) => x.cdata));
  }
}
