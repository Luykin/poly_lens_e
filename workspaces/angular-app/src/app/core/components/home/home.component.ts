import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public titleParams = {
    open_tag: "<span class='thin-text'>",
    close_tag: '</span>',
    user_name: '',
  };

  constructor(private router: Router) {}

  public goToPage(link: string): void {
    this.router.navigate([link]);
  }
}
