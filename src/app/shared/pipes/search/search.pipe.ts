import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(myArry:any[] , text:string): any {
    return myArry.filter(  (item)  => item.title.toLowerCase().includes(text.toLowerCase())  );
  }

}
