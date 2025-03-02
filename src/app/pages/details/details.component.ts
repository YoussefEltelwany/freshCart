import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProuductsService } from '../../core/services/product/prouducts.service';
import { IData } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
@Component({
    selector: 'app-details',
    imports: [CarouselModule, CurrencyPipe],
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute =inject(ActivatedRoute);
  private readonly prouductsService =inject(ProuductsService);
  productID:any;
  productDetails: IData = {} as IData;

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,  
      }
    }
  }






  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        console.log(res.get("id"));
        this.productID=res.get("id");
        this.prouductsService.getSpecificProducts(this.productID).subscribe({
          next:(res)=>{
            console.log(res);
            this.productDetails=res.data;
          },
          error:(err)=>{
            console.log(err);
          }
        })
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
