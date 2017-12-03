import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SelectRoutePage} from '../select-route/select-route';
import {MapsUitlity} from '../../app/mapsutility.service';
//import {GoogleplaceDirective} from '../../app/mapsautocomplete.directive'

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[MapsUitlity]
})


export class HomePage {
 Origin: any;
 Destination: any;
 googleOriginName:any;
 googleDestinationName:any;


  constructor(public navCtrl: NavController,public storage :Storage,public mapsUitlity:MapsUitlity) {

  }
      launchShortestRoutePage()
      {
      let UserLocation ={
      currentOrigin: this.googleOriginName,
       currentDestination: this.googleDestinationName,
      }

        this.navCtrl.push(SelectRoutePage,UserLocation)
      }

     ngOnInit() 
      {
    //  this.setAutoComplete();;an
      }

      ionViewDidEnter()
      {
       //this.googleOriginName = 'Dubai International Airport';
       var thisClass = this;
       this.googleOriginName = {"lat":25.2531745,"lng":55.365672800000084};
       MapsUitlity.setMapsAutoComplete(document.getElementById('txtDestination'),function(destination)
       {
          thisClass.googleDestinationName = destination;
           console.log(JSON.stringify(destination));
          MapsUitlity.displayGoogleRoute(document.getElementById('map'),thisClass.googleOriginName,thisClass.googleDestinationName);
       }); 
      }
}
