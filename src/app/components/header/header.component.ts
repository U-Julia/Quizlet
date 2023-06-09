import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor (
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  navigateToRegistration():void {
    this.router.navigate(['/registration']);
  }

  navigateToHome():void {
    this.router.navigate(['/']);
  }
}
