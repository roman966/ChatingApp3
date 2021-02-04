import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PrescenceService } from 'src/app/_services/prescence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
 
  member : Member;
 
  constructor(private memberService: MembersService, 
    private route: ActivatedRoute,public prescence: PrescenceService,
    private messageService: MessageService ) { }
    
  ngOnInit(): void {
    this.loadMember(); 
    
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get(
      'useremail')).subscribe(member =>{
        this.member = member;
    })
    
  }
 

  
    

    
  
 

}
