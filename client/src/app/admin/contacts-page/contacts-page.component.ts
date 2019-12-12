import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MaterialInstance, MaterialServices } from '../shared/classes/material.services';
import { OverviewPage } from '../shared/interfaces';
import { AnalyticsService } from '../shared/servises/analytics.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})
export class ContactsPageComponent implements OnInit {


  @ViewChild('tapTarget', {static:false}) tapTargetRef: ElementRef
  tabTarget: MaterialInstance

  yesterday = new Date()

  constructor(private service: AnalyticsService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.tabTarget.destroy()
  }

  ngAfterViewInit() {
    this.tabTarget = MaterialServices.initTapTarget(this.tapTargetRef)
  }

  openInfo() {
    this.tabTarget.open()
  }

}
