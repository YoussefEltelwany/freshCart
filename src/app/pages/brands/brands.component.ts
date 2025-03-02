import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly brandsService=inject(BrandsService)

  brands:WritableSignal<Ibrands[]>=signal([])

  ngOnInit(): void {
    this.displayAllbrands();
  }
  displayAllbrands(){
    this.brandsService.getallBrnds().subscribe({
      next: (brands) => {
        console.log(brands)
        this.brands.set(brands.data)
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
