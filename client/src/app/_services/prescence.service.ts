import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class PrescenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string []>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) { }

  createHubConnection(user: User){
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.hubUrl + 'prescence', {
      accessTokenFactory: () => user.token
    })
    .withAutomaticReconnect()
    .build()

    this.hubConnection
    .start()
    .catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline', useremail =>{
      this.toastr.info(useremail + 'has connected');
    })
    this.hubConnection.on('UserIsOffline', useremail =>{
      this.toastr.warning(useremail + 'has disconnected');
    })
    this.hubConnection.on('GetOnlineUsers',(useremails: string[]) =>{
      this.onlineUsersSource.next(useremails);
    })

    this.hubConnection.on('NewMessageReceived',({useremail})=>{
      this.toastr.info('New message!')
      .onTap
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/members/' + useremail));
    })
  }
  stopHubConnection(){
    this.hubConnection.stop().catch(error => console.log(error));
  }
}
