import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamMembersCount',
  standalone:true,
})
export class TeamMembersCountPipe implements PipeTransform {

  transform(members: any[]): string {
    const count = members.length;
    return count > 5 ? `+${count - 5}` : '';
  }



}
