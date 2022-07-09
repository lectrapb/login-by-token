import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UserService } from '../../services/user.service';
import { Constant } from '../../model/constant.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private emailPattern:any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public remember: boolean = false;

  public validUserForm= this.fb.group({

      email:    ['', [Validators.required, Validators.pattern(this.emailPattern)]], 
      password: ['', [Validators.required, Validators.minLength(5)]],
      remember: [this.statusRememberme()]
  
  });

  constructor(private fb: FormBuilder,
              private userService: UserService, 
              private router: Router) { }

  ngOnInit(): void {

      this.remember = this.statusRememberme();

      if(this.remember){         
         this.userService.validateToken()
            .subscribe(isValid =>{
              
                if(isValid){
                  this.router.navigateByUrl('/dashboard/home');
                  Swal.fire('Successful', 'Get into Login app!', 'success');
                }else{
                  Swal.fire('Error', 'Error validacion please login again', 'error');
                  localStorage.removeItem(Constant.REMEMBER_USER);
                  this.remember = false;  
                } 
            });        
      }
      
  }

  validateUser():void{

      this.userService.validateUser(this.validUserForm.value)
          .subscribe(resp =>{
              
              if(resp.ok){
                 this.remember = this.validUserForm.get('remember')?.value;                         
                 localStorage.setItem(Constant.TOKEN, resp.token || '');
                 this.router.navigateByUrl('/dashboard/home');
                 if(this.remember){
                    localStorage.setItem(Constant.REMEMBER_USER, this.remember.toString())
                 }else {
                    localStorage.removeItem(Constant.REMEMBER_USER);
                 }
                 Swal.fire('Successful', 'Get into Login app!', 'success');
              }else { 
                 Swal.fire('Error', 'Failed to login user', 'error');              
                 localStorage.setItem(Constant.TOKEN, '');
                 this.validUserForm.reset; 
              }
          });
     
  }

  private statusRememberme(): boolean{       
    return localStorage.getItem(Constant.REMEMBER_USER)?.toLowerCase() === 'true';
  }

  get email():any{ return this.validUserForm.get('email')};
  get password():any{ return this.validUserForm.get('password')};

}
