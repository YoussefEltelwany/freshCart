import { Component } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { Iorder } from '../../shared/interfaces/iorder';


@Component({
    selector: 'app-allorders',
    imports: [],
    templateUrl: './allorders.component.html',
    styleUrl: './allorders.component.scss'
})
export class AllordersComponent {


  constructor(private ordersService:OrdersService) { }
  userId: Iorder[] = [];


  ngOnInit(): void {
   this.getallorders();

  }


  getallorders(): void {
    this.ordersService.getUserorders().subscribe(
      {
        next: (response) => {
          console.log(response );
          this.userId = response;
        },
        error: (error) => {
          console.log(error);
        }
      }
    )

  }

}
