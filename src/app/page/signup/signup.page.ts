import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/module/must-match';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupForm: FormGroup;

  constructor(private  authService:  AuthService, private  router:  Router,private fb: FormBuilder) { 

    this.signupForm = fb.group({

      username: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      // surname: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30),Validators.required])],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
      cpassword: ['', Validators.required]

    }, 
    // {
    //   validator: MustMatch('password', 'cpassword')
    // }
    );
  }
  
  ngOnInit() {
  }



}
