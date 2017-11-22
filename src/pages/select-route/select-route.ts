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

  constructor(public navCtrl: NavController, public navParams: NavParams,public mapsUitlity:MapsUitlity) {
  this.Origin = this.navParams.get('currentOrigin');
  this.Destination = this.navParams.get('currentDestination');
alert('hello');
  }

  ionViewDidEnter() {
       MapsUitlity.displayGoogleRoute(document.getElementById('map1'),this.Origin,this.Destination);
}

}
