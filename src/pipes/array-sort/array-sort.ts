import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ArraySortPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'arraySortPipe',
})
export class ArraySortPipe implements PipeTransform {
  transform(array: Array<string>, args: string): Array<string> {
    if (array !== undefined) {
        array.sort((a: any, b: any) => {
            if ( a[args] < b[args] ){
                return -1;
            } else if ( a[args] > b[args] ) {
                return 1;
            } else {
                return 0;   
            }
        });
    }
    return array;

  }
  
}
