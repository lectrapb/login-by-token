import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName: string='';
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
     this.userName = this.userService.currentUser.name;
  }

  close(){
     this.userService.closeSession();
     this.router.navigateByUrl('/login');
  }

}
