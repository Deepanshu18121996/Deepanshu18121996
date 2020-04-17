import { Component, OnInit } from "@angular/core";
import { CartItemService } from "../../service/cart-item.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cart_res;
  cart_data;
  index = 0;
  price = [];
  sub_total;
  gst;
  grand_total;

  constructor(private cart: CartItemService, private router: Router) {}

  cartitem() {
    const email = localStorage.getItem("email");
    this.cart.get_cart(email).subscribe((res) => {
      this.cart_res = res;
      if (this.cart_res.err == 1) {
        Swal.fire({
          title: "Error",
          text: "Empty Cart",
          icon: "error",
          footer: "!",
        }).then(() => {
          this.router.navigate(["/home"]);
        });
      } else {
        this.cart_data = this.cart_res.data;
        this.total();
      }
    });
  }

  increase(i) {
    this.cart_data[i].quantity = this.cart_data[i].quantity + 1;
    this.cart_data[i].total =
      this.cart_data[i].current_price * this.cart_data[i].quantity;
    this.new_total();
  }

  decrease(i) {
    if (this.cart_data[i].quantity == 1) {
      Swal.fire({
        title: "Error",
        text: "Ohh No",
        icon: "error",
        footer: "!",
      });
    } else {
      this.cart_data[i].quantity = this.cart_data[i].quantity - 1;
      this.cart_data[i].total =
        this.cart_data[i].current_price * this.cart_data[i].quantity;
      this.new_total();
    }
  }

  total() {
    this.cart_data.forEach((i) => {
      i.total = i.current_price * 1;
      this.price.push(i.total);
    });
    this.sub_total = this.price.reduce(function (a, b) {
      return a + b;
    }, 0);
    this.gst = Math.ceil((this.sub_total * 18) / 100);
    this.grand_total = this.gst + this.sub_total;
  }

  new_total() {
    this.price = [];
    this.cart_data.forEach((e) => {
      this.price.push(e.total);
    });
    this.sub_total = this.price.reduce(function (a, b) {
      return a + b;
    }, 0);
    this.gst = Math.ceil((this.sub_total * 18) / 100);
    this.grand_total = this.gst + this.sub_total;
  }

  check_out() {
    const data = {
      order: this.cart_data,
      sub_total: this.sub_total,
      gst: this.gst,
      grandtotal: this.grand_total,
    };
    console.log(data);
  }
  ngOnInit() {
    this.cartitem();
  }
}
