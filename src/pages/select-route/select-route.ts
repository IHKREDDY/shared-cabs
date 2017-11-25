import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {MapsUitlity} from '../../app/mapsutility.service';

/**
 * Generated class for the SelectRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-select-route',
  templateUrl: 'select-route.html',
  providers:[MapsUitlity]
})
export class SelectRoutePage {

 Origin: any;
 Destination: any;
 RouteList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public mapsUitlity:MapsUitlity) {
  this.Origin = this.navParams.get('currentOrigin');
  this.Destination = this.navParams.get('currentDestination');
  this.RouteList = {"routes":[{"lat":25.254226,"lng":55.330306000000064},{"lat":25.1279484,"lng":55.38626380000005},{"lat":25.1648925,"lng":55.4084034}]}
  }

  ionViewDidEnter() {
    //min max distance = 
//      let minDistance= 0;
//      let distance  = 0;
//      let 
//      this.RouteList.routes.forEach(route => {
//             minDistance = MapsUitlity.calculateDistance(this.Destination.lat,this.Destination.lng,route.lat,route.lng,"K");
// });
    }

}
