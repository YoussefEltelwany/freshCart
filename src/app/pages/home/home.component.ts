import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProuductsService } from '../../core/services/product/prouducts.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
    selector: 'app-home',
    imports: [CarouselModule, SearchPipe, FormsModule, RouterLink ,CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly prouductsService = inject(ProuductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  searchName:any="";
  customMineslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }


  prouducts:WritableSignal<Iproduct[]> = signal([])
  // categories: Icategories[] = [];
  categories:WritableSignal<Icategories[]> =signal([])

  ngOnInit() {
    this.getProductData();
    this.getCategoryData();
  }
  getProductData() {
    this.prouductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.prouducts.set(res.data)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getCategoryData() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories.set(res.data)
      },
      error: (error) => {
        console.error(error);
      },
    })
  }


  addtoCart(id:string):void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == "success") {
          this.toastrService.success('Product Added Successfully', 'Success',{
            verticalPosition:'bottom'
          });
          this.cartService.cartnumber.set(res.numOfCartItems)
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }


  addtowishlist(id:string ):void {
    this.wishlistService.addToWishlist(id).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == "success") {
            this.toastrService.success('Product Added to Wishlist', 'Success');
            this.wishlistService.Wishnumber.set(res.data.length )
            console.log(res.data.length);
          }
        },error:(error)=>{
          console.log(error)
        }
    });
  }


}
