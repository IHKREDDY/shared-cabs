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
booking =
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
  PNR:any;
  LName:any;
  list;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http) {
   
       // console.log("Retriving your PNR Please wait ...Siva Tukanti"+this.data["PAX"]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetPnrPage');
  }

  getPNRDetails()  {
    
    this.http.get('assets/data/get-pnr.json')
    .subscribe(res => this.list = res.json());
        console.log("Retriving your PNR Please wait ...Siva Tukanti"+this.list);
  }

  
  

}
