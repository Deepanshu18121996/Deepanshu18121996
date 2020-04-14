import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotesComponent } from './pages/notes/notes.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { BooksComponent } from './pages/books/books.component';
import { MyaccComponent } from './pages/myacc/myacc.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddressComponent } from './pages/address/address.component';
import { OrderComponent } from './pages/order/order.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SellComponent } from './pages/sell/sell.component';



const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'login',component:LoginComponent},
  {path:'cart',component:CartComponent},
    {path:'check',component:CheckoutComponent},
  
  {path:'home',component:MainComponent},
  {path:'contact',component:ContactComponent},
  {path:'notes',component:NotesComponent},
  {path:'wishlist',component:WishlistComponent},
{path:'sell',component:SellComponent},
  
  
  {path:'books',component:BooksComponent},
  {path:'myacc',component:MyaccComponent,children:[
    {path:'',component:ProfileComponent},
    {path:'add',component:AddressComponent},
    {path:'order',component:OrderComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
