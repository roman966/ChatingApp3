import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {m
  baseUrl = environment.apiUrl;

  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers(){
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl+'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(email: string){
    const member = this.members.find(x => x.email === email);
    if(member != undefined) return of(member);
    return this.http.get<Member>(this.baseUrl+'users/'+email);
  }


}
