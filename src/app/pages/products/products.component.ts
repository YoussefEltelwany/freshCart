import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AllproductsService } from '../../core/services/allproducts/allproducts.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, FormsModule , SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent  implements OnInit {
  private readonly allproductsService=inject(AllproductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


  prouducts:WritableSignal<Iproduct[]> = signal([]);
   searchTerm: WritableSignal<string> = signal('');


 ngOnInit(): void {
     this.allproductsService.getAllProducts().subscribe({
       next: (response) => {
         console.log(response);
         this.prouducts.set(response.data);
       },
       error: (error) => {
         console.log(error);
       }
     })
 }

 addtoCart(id:string):void {
  this.cartService.addProductToCart(id).subscribe({
    next: (res) => {
      console.log(res);
      if (res.status == "success") {
        this.toastrService.success('Product Added Successfully', 'Success');
        this.cartService.cartnumber.set(res.numOfCartItems)
      }
    },
    error: (error) => {
      console.error(error);
    },
  });
}

}
