import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public registerForm = this.fb.group({
      name:     ['Jhon Doe', [Validators.required, Validators.minLength(2)]], 
      email:    ['test@email.com', [Validators.required, Validators.pattern(this.emailPattern)]], 
      password: ['123456', [Validators.required, Validators.minLength(5)]], 
      terms: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(): void{
      
    if(this.registerForm.valid){
        this.userService.registerUser(this.registerForm.value)
            .subscribe(resp =>{
                 if(resp){
                    Swal.fire('Successful', 'Get into Login app!', 'success');
                    this.router.navigateByUrl('/dashboard/home');
                                    
                 }else{
                   this.registerForm.reset();
                  Swal.fire('Error!', 'Fail to register user try again! ', 'error');
                 }
            });   
    }

  }


  get name():any{return this.registerForm.get('name')};
  get email():any{return this.registerForm.get('email')};
  get password():any{return this.registerForm.get('password')};

}
