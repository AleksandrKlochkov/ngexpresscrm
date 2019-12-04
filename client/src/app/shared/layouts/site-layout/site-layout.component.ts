import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { AuthServices } from '../../servises/auth.service';
import { Router } from '@angular/router';
import { MaterialServices } from '../../classes/material.services';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {


  @ViewChild('floating', {static: false}) floatingRef: ElementRef
  @ViewChild('sidebar', {static: false }) sidebarRef: ElementRef

  toggleSide: boolean = true

  links = [
    {url: '/overview', name: 'Обзор', icon: 'dashboard'},
    {url: '/analytics', name: 'Аналитика', icon: 'equalizer'},
    {url: '/history', name: 'История', icon: 'history'},
    {url: '/order', name: 'Добавить заказ', icon: 'library_add'},
    {url: '/categories', name: 'Ассортимент', icon: 'apps'}
  ]

  constructor(private auth: AuthServices,
              private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
      MaterialServices.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  toggleSidebar(event: Event): void {
    event.preventDefault()
    this.toggleSide = !this.toggleSide
  }

}
