import { Component, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import{RepairPage}from '../repair/repair';
import { Tabs } from 'ionic-angular';

// import {NavController, Slides, Tab, Tabs} from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RepairPage;
  tab3Root = AboutPage;
  // tabRoots: Object[];


 @ViewChild('myTabs') tabRef: Tabs;


  constructor() {
   
  }
  // swipeEvent(event){
  //   //向左滑
  // if(event.direction==2){
  //   if(this.segmentsArray.indexOf(this.tabsModel)<2){
  // this.tabsModel = this.segmentsArray[this.segmentsArray.indexOf(this.tabsModel)+1];
  //   }
  
  // }
  // //向右滑
  // if(event.direction==4){
  //   if(this.segmentsArray.indexOf(this.tabsModel)>0){
  // this.tabsModel = this.segmentsArray[this.segmentsArray.indexOf(this.tabsModel)-1];
  //   }
    
  // }
  // }

}
