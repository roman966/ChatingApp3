import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit,OnDestroy {
  @ViewChild('messageForm') messageForm : NgForm;
  @Input() useremail: string;
  
  @Input() messages: Message[]; 
  messageContent: string;
  user: User;

  constructor(public messageService: MessageService,private accountService: AccountService,
    private router: Router) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user =user);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false ;
  }
  

  ngOnInit(): void {
   this.messageService.createHubConnection(this.user,this.useremail);
  }
   
  sendMessage(){
    this.messageService.sendMessage(this.useremail,this.messageContent).then(() =>{
      
      this.messageForm.resetForm();
    })
  }
  
  loadMessages(){
    this.messageService.getMessageThread(this.useremail).subscribe(messages =>{
      this.messages = messages;
      
    })
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
 
}
