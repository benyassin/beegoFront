import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import pageSettings from '../../config/page-settings';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'signup',
    templateUrl: './signup.html'
})


export class SignUpComponent implements OnDestroy {
  pageSettings = pageSettings;
    signup: any = {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        _password: null,
        accepted: false,
    };
    error: any;

  constructor(private router: Router,
    private renderer: Renderer2,
    private Userserice: UserService, private httpClient: HttpClient) {
    this.pageSettings.pageEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');
  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }
  camparePasswords(password, _password) {
    return password === _password;

  }
  formSubmit(f: NgForm) {
      console.log(f.value);
      if (f.valid) {
        this.Userserice.createUser(f.value)
        .subscribe(
            (data) => {
                console.log(data);
                // this.router.navigate(['home']);
            },
            err => {
                this.error = err.error.error;
            });
      }
  }
}
