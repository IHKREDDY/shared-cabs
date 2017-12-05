import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SelectedCab } from '../../app/SelectedCab';
import { MapsUitlity } from '../../app/mapsutility.service';
import { NgZone } from '@angular/core';

/**
 * Generated class for the ConfirmRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirm-route',
  templateUrl: 'confirm-route.html',
  providers: [MapsUitlity]
})
export class ConfirmRoutePage {

  zone: any;
  selectedCab: SelectedCab =  {
    paxCount:0,
    PNR:"",
    cabList: [{route_no: 1, from_loc_name: "", to_loc_name: "",from_coordinates:"",to_coordinates:"",cabType:""}],
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public mapsUitlity: MapsUitlity) {
    this.zone = new NgZone({ enableLongStackTrace: false });
        this.storage.get('selected_cabs').then((selected_cab) => {
      this.zone.run(() => {
        this.selectedCab = JSON.parse(selected_cab);
      });
    });
  }

  ionViewDidLoad() {
    var thisClass =this;
    window.setTimeout(function(){ thisClass.setMaps();}, 1000);
  }

  setMaps() {
    console.log(JSON.stringify(this.selectedCab.cabList));
    this.selectedCab.cabList.forEach(cab => {
      this.zone.run(() => {
       MapsUitlity.displayGoogleRoute(document.getElementById('map' + cab.route_no+1), cab.from_coordinates, cab.to_coordinates);
      });
    });
  }

}
