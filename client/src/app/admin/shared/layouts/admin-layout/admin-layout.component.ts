
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { AuthServices } from '../../servises/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialServices } from '../../classes/material.services';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  @ViewChild('floating', {static: false}) floatingRef: ElementRef
  @ViewChild('sidebar', {static: false }) sidebarRef: ElementRef
  title: string = ''

  toggleSide: boolean = true

  links = [
    {url: '/admin/overview', name: 'Обзор', icon: 'dashboard'},
    {url: '/admin/analytics', name: 'Аналитика', icon: 'equalizer'},
    {url: '/admin/history', name: 'История', icon: 'history'},
    {url: '/admin/order', name: 'Добавить заказ', icon: 'library_add'},
    {url: '/admin/categories', name: 'Ассортимент', icon: 'apps'},
    {url: '/admin/contacts', name: 'Контакт центр', icon: 'call'},
    {url: '/admin/staff', name: 'Сотрудники', icon: 'people'}
  ]

  constructor(private auth: AuthServices,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
      MaterialServices.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/admin/login'])
  }

  toggleSidebar(event: Event): void {
    event.preventDefault()
    this.toggleSide = !this.toggleSide
  }

}

