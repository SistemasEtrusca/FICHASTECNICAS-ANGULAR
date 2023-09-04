import { Component, OnInit  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentRoute: string | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  shouldShowBackButton(): boolean {
    return this.currentRoute !== '/';
  }

  goBack() {
    if (this.currentRoute === '/home') {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigate(['/']);
    }
  }
}
