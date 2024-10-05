import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(value: number): { text: string, color: string } {
    switch (value) {
      case 0:
        return { text: 'InProgress', color: 'orange' };
      case 1:
        return { text: 'Completed', color: 'green' };
      case 2:
        return { text: 'Overdue', color: 'red' };
      default:
        return { text: ' Unknow ', color: 'grey' };
    }
  }
  // transform(value: number): string {
  //   switch (value) {
  //     case 0:
  //       return 'InProgress';
  //     case 1:
  //       return 'Completed';
  //     case 2:
  //       return 'Overdue';
  //     default:
  //       return ' Unknow ';
  //   }
  // }

}
