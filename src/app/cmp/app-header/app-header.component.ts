import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;

  constructor(private renderer: Renderer2) {
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

  ngOnInit(): void {}

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
}