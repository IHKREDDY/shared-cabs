import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';


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
booking1 =
{
 "pnr":"ABCDEF",
 "paxes": [
        { "firstname":"sachin", "lastname":"tendulkar"  },
        { "firstname":"virat", "lastname":"kohli"},
        { "firstname":"yuvraj", "lastname":"singh"  },
       ],
 "travelplans": [
     { "origin":"DXB", "origin_airport":"Dubai International Airport","destination":"MAA", "destination_airport":"Chennai International Airport" }  
  ],
}
booking=
{
 "pnr":"",
 "paxes": [

       ],
 "travelplans": [],
}
  PNR:any;
  LName:any;
  listPNR;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http) {
   
       // console.log("Retriving your PNR Please wait ...Siva Tukanti"+this.data["PAX"]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetPnrPage');
  }

  getPNRDetails()  {
    this.booking=this.booking1;
    this.http.get('assets/data/get-pnr.json')
    .subscribe(res => this.listPNR = res.json());
        console.log("Retriving your PNR Please wait ...Siva Tukanti"+JSON.stringify(this.listPNR));
  }

  
  

}
