import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;

  constructor(private renderer: Renderer2, private userService: UserService, private router: Router) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.toggleButton.nativeElement &&
        e.target !== this.modal.nativeElement
      ) {
        this.isModalOpen = false;
      }
    });
  }

  @Input() currentCmpName!: string;
  isModalOpen: boolean = false;
  loggedInUser!: User;
  loggedInUser$!: Observable<User>;
  userServicesSub!: Subscription;

  ngOnInit(): void {
    this.userServicesSub = this.userService.loggedInUser$.subscribe((data) => {
      this.loggedInUser = data;
    });
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  async logout(){
    await this.userService.logout()
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.userServicesSub.unsubscribe()
  };
}