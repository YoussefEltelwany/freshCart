import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AllproductsService } from '../../core/services/allproducts/allproducts.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-products',
  imports: [RouterLink, FormsModule, SearchPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly allproductsService = inject(AllproductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  prouducts: WritableSignal<Iproduct[]> = signal([]);
  searchTerm: WritableSignal<string> = signal('');
  text: WritableSignal<string> = signal('');
  p: WritableSignal<number> = signal(1);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.allproductsService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.metadata);

        this.prouducts.set(response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addtoCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          this.toastrService.success('Product Added Successfully', 'Success');
          this.cartService.cartnumber.set(res.numOfCartItems);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  addtowishlist(id: string): void {
    this.wishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          this.toastrService.success('Product Added to Wishlist', 'Success');
          this.wishlistService.Wishnumber.set(res.data.length);
          console.log(res.data.length);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
