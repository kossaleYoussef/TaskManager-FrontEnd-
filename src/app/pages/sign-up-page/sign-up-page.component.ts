import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  signupButtonClick(username: string, password: string){
    this.auth.signUp(username, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    });
  }
}
