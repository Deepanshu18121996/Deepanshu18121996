import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'ngx-accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeadComponent } from './pages/head/head.component';
import { FooterComponent } from './pages/footer/footer.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { SliderComponent } from './pages/slider/slider.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotesComponent } from './pages/notes/notes.component';
import { BooksComponent } from './pages/books/books.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderComponent } from './pages/order/order.component';
import { AddressComponent } from './pages/address/address.component';
import { MyaccComponent } from './pages/myacc/myacc.component';
import { SearchComponent } from './pages/search/search.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SellComponent } from './pages/sell/sell.component';
import { AddnotesComponent } from './pages/addnotes/addnotes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    SliderComponent,
    HomeComponent,
    ContactComponent,
    NotesComponent,
    BooksComponent,
    WishlistComponent,
    SidebarComponent,
    ProfileComponent,
    OrderComponent,
    AddressComponent,
    MyaccComponent,
    SearchComponent,
    CartComponent,
    CheckoutComponent,
    SellComponent,
    AddnotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
