import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  reactiveForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      'username': new FormControl(null),
      'password': new FormControl(null),
      'email': new FormControl(null, Validators.email)
    });
  }

  onSubmit() {
    console.log(this.reactiveForm.value);
  }

}
