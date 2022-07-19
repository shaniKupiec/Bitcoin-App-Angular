import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  async onSubmit(form: NgForm) {
    try{
      const { email, password } = form.value;
      await this.userService.login(email, password);
      this.router.navigate(['/about']);
      form.reset();
    } catch {
      this.userService.setUserMsg(false, 'Invalid email or password')
    }
  }
}
