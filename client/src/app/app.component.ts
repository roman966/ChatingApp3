import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {User} from './_models/user';
import { AccountService } from './_services/account.service';
import { PrescenceService } from './_services/prescence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Chating App';
  users: any;
  constructor(private accountService: AccountService, private prescence: PrescenceService) {}

  ngOnInit(){
    this.setCurrentUser();
  }
   
  setCurrentUser(){
    
     const user : User = JSON.parse(localStorage.getItem('user'));
     if(user)
     {
      this.accountService.setCurrentUser(user);
      this.prescence.createHubConnection(user);
     }
     
  }


}
