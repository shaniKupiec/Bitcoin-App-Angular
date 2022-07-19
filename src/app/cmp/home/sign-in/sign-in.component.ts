import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm) {
    try{
      const { name, email, password } = form.value;
      await this.userService.signIn(name, email, password);
      this.router.navigate(['/about']);
      form.reset();
    } catch {
      this.userService.setUserMsg(false, 'problem')
    }
  }

}
