import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core'

import { Observable } from 'rxjs'
import { MaterialInstance, MaterialServices } from '../shared/classes/material.services'
import { OverviewPage } from '../shared/interfaces'
import { AnalyticsService } from '../shared/servises/analytics.service'


@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget', {static:false}) tapTargetRef: ElementRef
  tabTarget: MaterialInstance
  data$: Observable<OverviewPage> 

  yesterday = new Date()

  constructor(private service: AnalyticsService) { }

  ngOnInit() {
    this.data$ = this.service.getOverview()

    this.yesterday.setDate(this.yesterday.getDate() - 1)
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
