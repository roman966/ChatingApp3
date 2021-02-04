import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages : Message[];
  pagination: Pagination;
  container :string;
  pageNumber = 1;
  pageSize = 5;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessagesInbox();
  }
  loadMessagesInbox(){
    this.container ='Inbox';
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe(
      response => {
        this.messages = response.result;
        this.pagination = response.pagination;
      }
    )
  }
  loadMessagesOutbox(){
    this.container ='Outbox';
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe(
      response => {
        this.messages = response.result;
        this.pagination = response.pagination;
      }
    )
  }
   
  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(() =>{
      this.messages.splice(this.messages.findIndex(m =>m.id === id),1);
    })
  }


  pageChanged(event : any){
    this.pageNumber = event.page;
    if(this.container == 'Inbox')
    {
      this.loadMessagesInbox();
    }
    else 
    {
      this.loadMessagesOutbox();
    }

  }
   


}
