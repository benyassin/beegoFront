import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import pageSettings from '../../config/page-settings';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'wizard',
    templateUrl: './wizard.html',
    styleUrls: ['./wizard.css'],

})


export class WizardComponent implements OnDestroy {
    pageSettings = pageSettings;
    signup: any = {
        firstname: null,
        lastname: null,
        accepted: false,
    };
    error: any;
    step = 1;
    wizard: any = [
    {title: 'Information Personnel', description: 'Lorem ipsum dolor sit amet', number: 1},
    {title: 'Organization', description: 'Lorem ipsum dolor sit amet', number: 2},
    {title: 'Step 3', description: 'Lorem ipsum dolor sit amet', number: 3},
    {title: 'Step 4', description: 'Lorem ipsum dolor sit amet', number: 4}];

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
  next() {
    if (this.step < 4) {

    this.step = this.step + 1 ;
    }

  }
  previous() {
    if (this.step > 1) {

        this.step = this.step - 1 ;
      }
    }
  formSubmit(f: NgForm) {
      console.log(f.value);
      if (f.valid) {
        this.Userserice.updateUser(f.value)
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
