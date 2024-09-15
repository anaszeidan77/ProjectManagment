import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone:true,
})
export class TruncateTextPipe implements PipeTransform {

  // transform(value: string, limit: number = 25): string {
  //   if (!value) {
  //     return '';
  //   }

  //   return value.length > limit ? value.slice(0, limit) + '...' : value;
  // }

  transform(value: string, wordLimit: number = 3): string {
    if (!value) return '';

    const words = value.split(' ');

    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }

    return value;
  }
}
