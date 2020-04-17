import { Component, OnInit } from "@angular/core";
import { GetWishlistService } from "../../service/get-wishlist.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { SaveCartService } from "../../service/save-cart.service";
import { RemoveWishService } from "../../service/remove-wish.service";
@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.css"],
})
export class WishlistComponent implements OnInit {
  wishlist_res;
  wish_data;
  cart_res;
  remove_res;
  constructor(
    private wishlist: GetWishlistService,
    private router: Router,
    private savecart: SaveCartService,
    private remove: RemoveWishService
  ) {}

  get_wish() {
    const email = localStorage.getItem("email");
    this.wishlist.get_wishlist(email).subscribe((res) => {
      this.wishlist_res = res;
      if (this.wishlist_res.err == 1) {
        Swal.fire({
          title: "Error",
          text: "Empty WishList",
          icon: "error",
          footer: "!",
        }).then(() => {
          this.router.navigate(["/home"]);
        });
      } else {
        this.wish_data = this.wishlist_res.data;
        console.log(this.wish_data);
      }
    });
  }

  remove_wish(id) {
    console.log("front id       :-" + id);
    this.remove.remove(id).subscribe((res) => {
      this.remove_res = res;
      if (this.remove_res.err == 1) {
        Swal.fire({
          title: "Error",
          text: "This item already Delte",
          icon: "error",
          footer: "Please Refesh",
        }).then(() => {
          location.reload();
        });
      } else {
        Swal.fire({
          title: "Success",
          text: "Book Remove From WIshlist",
          icon: "success",
          footer: "!",
        }).then(() => {
          location.reload();
        });
      }
    });
  }

  add_cart(name, price, writer, image) {
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

  ngOnInit() {
    this.get_wish();
  }
}
