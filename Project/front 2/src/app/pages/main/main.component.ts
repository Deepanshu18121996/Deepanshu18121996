import { Component, OnInit } from "@angular/core";
import { DetailsService } from "../../service/details.service";
import { BooksdetailsService } from "../../service/booksdetails.service";
import { BestSellerService } from "../../service/best-seller.service";
import { Observable, Subscribable, Subscriber, Subscription } from "rxjs";
import { jsonresponse } from "src/app/pagemodels/jsonresponse";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { SaveCartService } from "../../service/save-cart.service";
import { SaveWishlistService } from "../../service/save-wishlist.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  book_categories$: Observable<jsonresponse>;
  randomNum: Subscription;
  randomCat: Subscription;
  randomNumber: number;
  randomCategory: string;
  book_details$: Observable<jsonresponse>;
  science_details$: Observable<jsonresponse>;
  wishlist_res;
  cart_res;
  constructor(
    private category_name: DetailsService,
    private book_name: BooksdetailsService,
    private science_book: BestSellerService,
    private savecart: SaveCartService,
    private savewishlist: SaveWishlistService
  ) {
    this.books_c();
  }

  books_c() {
    this.book_categories$ = this.category_name
      .details()
      .pipe(map((x) => x.cdata));
  }

  randomizeUpperBooks() {
    this.randomNum = this.category_name
      .details()
      .pipe(map((x) => Math.floor(Math.random() * x.cdata.length)))
      .subscribe((x) => {
        this.randomNumber = x;
      });
    this.randomCat = this.book_categories$.subscribe((y) => {
      this.randomCategory = y[this.randomNumber].category;
      this.book_d(this.randomCategory);
    });
  }

  randomizeLowerBooks() {
    this.randomNum = this.category_name
      .details()
      .pipe(map((x) => Math.floor(Math.random() * x.cdata.length)))
      .subscribe((x) => {
        this.randomNumber = x;
      });
    this.randomCat = this.book_categories$.subscribe((y) => {
      this.randomCategory = y[this.randomNumber].category;
      this.science(this.randomCategory);
    });
  }

  book_d(categoryName) {
    this.book_details$ = this.book_name
      .bookdetails(categoryName)
      .pipe(map((x) => x.cdata));
  }
  science(categoryName) {
    this.science_details$ = this.book_name
      .bookdetails(categoryName)
      .pipe(map((x) => x.cdata));
  }

  cart(name, price, writer, image) {
    const data = {
      name: name,
      price: price,
      writer: writer,
      image: image,
      quantity: 1,
      token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
    };
    this.savecart.cart(data).subscribe((res) => {
      this.cart_res = res;
      if (this.cart_res.err == 1) {
        Swal.fire({
          title: "Error",
          text: "Already In Cart",
          icon: "error",
          footer: "!",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: "Book Added",
          icon: "success",
          footer: "!",
        });
      }
    });
  }

  wishlist(name, price, writer, image) {
    const data = {
      name: name,
      price: price,
      writer: writer,
      image: image,
      token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
    };
    this.savewishlist.wishlist(data).subscribe((res) => {
      this.wishlist_res = res;
      if (this.wishlist_res.err == 1) {
        Swal.fire({
          title: "Error",
          text: "Login",
          icon: "error",
          footer: "!",
        });
      } else if (this.wishlist_res.err == 2) {
        Swal.fire({
          title: "Error",
          text: "Already In WishList",
          icon: "error",
          footer: "!",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: "Book Added",
          icon: "success",
          footer: "!",
        });
      }
    });
  }
  quickview(name, price, currentprice, image, writer, edition, publishedyear) {
    console.log("quick view");
  }

  ngOnInit() {
    this.randomizeUpperBooks();
    this.randomizeLowerBooks();
  }
}
