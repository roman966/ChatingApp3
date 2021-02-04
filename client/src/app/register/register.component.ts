import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model : any ={};
  
  constructor(private accountService: AccountService, 
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
         
  }

  

  register(){
    
   this.accountService.register(this.model).subscribe(response => {
     this.router.navigateByUrl('/members');
    },error => {
      if(error.error)
      this.toastr.info("Valid email and non-blank info needed");
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
