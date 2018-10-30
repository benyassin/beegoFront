import { Component, OnInit  } from '@angular/core';
import { NgbModal, NgbDateAdapter, NgbDateStruct, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { User } from '../../services/user.interface'
@Component({
  selector: 'users',
  templateUrl: './users.html'
})

export class UsersPage implements OnInit {
  constructor(private modalService: NgbModal, private userService: UserService) {
  }
  options: NgbModalOptions = {
    size: 'lg'
  };
  user: any = {
    username: null,
    password: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null
  };
  open(content) {
    console.log(content);
    this.modalService.open(content, this.options).result.then((result) => {
    //  const map = L.map('mapid').setView([51.505, -0.09], 13);
      // map.invalidateSize();
      // this.closeResult = `Closed with: ${result}`;
      console.log(result);
      console.log(this.user);
    }, (reason) => {
      console.log(reason);
      console.log(this.user);
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  createUser() {
    console.log(this.user);
    const user = this.user;
    this.userService.createUser(user).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  ngOnInit() {
  }
}
