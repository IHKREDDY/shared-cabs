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
})
export class ConfirmRoutePage {

selectedCab : SelectedCab;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage, public mapsUitlity: MapsUitlity) {
  }

  ionViewDidLoad() {
      this.storage.get('selected_cabs').then((selected_cab) => {
      this.selectedCab = selected_cab;
    });

  }

}
