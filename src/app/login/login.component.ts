import { Component, OnInit } from '@angular/core';
import { TokenPayload, AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  notFound = false;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
      this.notFound = false;
    }, (err) => {
      if(err.error.message == "User not found"){
        this.notFound = true;
        console.log("User not found");
      } else {
        console.log(err);
      }
    });
  }

}
