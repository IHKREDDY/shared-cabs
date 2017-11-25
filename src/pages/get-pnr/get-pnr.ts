import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GetPnrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-get-pnr',
  templateUrl: 'get-pnr.html',
})
export class GetPnrPage {
booking =
{
 "pnr":"ABCDEF",
 "pax": [
        { "firstname":"sachin", "lastname":"tendulkar"  },
        { "firstname":"virat", "lastname":"kohli"  },
        { "firstname":"yuvraj", "lastname":"singh"  },
       ],
 "travelplans": [
     { "origin":"DXB", "origin_airport":"Dubai International Airport","destination":"MAA", "destination_airport":"Chennai International Airport" }  
  ],
}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetPnrPage');
  }

}
