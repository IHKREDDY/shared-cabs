import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
<<<<<<< HEAD
import { Http } from '@angular/http';
=======
import {Http} from '@angular/http';
import {SelectedCab  } from '../../app/SelectedCab';
>>>>>>> e6948ee11ddd06d93a22e23fe2c9da88fcdbc7ae


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
    "pnr": "",
    "paxes": [{ " ": " ", " ": " " }],
    "travelplans": [],
  };
  booking =
    {
      "pnr": "",
      "paxes": [{ " ": " ", " ": " " }],
      "travelplans": [],
    };
  PNR: any;
  LName: any;
  listPNR;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    // console.log("Retriving your PNR Please wait ...Siva Tukanti"+this.data["PAX"]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetPnrPage');
  }

<<<<<<< HEAD
  getPNRDetails() {

    // this.fetchPNRJSson(this.listPNR,this.parseJson);
=======
  getPNRDetails()  {
    //creating selected cab object
    //let objSelectedCab = new SelectedCab;
    //objSelectedCab.cabList.push();

    this.booking=this.booking1;
>>>>>>> e6948ee11ddd06d93a22e23fe2c9da88fcdbc7ae
    this.http.get('assets/data/get-pnr.json')
      .subscribe(res => this.parseJson(res.json()));

    //  this.booking.pnr=this.listPNR.pnr;
    //  this.booking.paxes=this.listPNR.paxes;

    // console.log("Retriving your PNR Please wait ...Siva Tukanti" +this.booking);
  }
  parseJson(listpnr1) {
    JSON.stringify(listpnr1);
    // console.log("Retriving your PNR Please wait ...Siva Tukanti"+PNRPOJO);
    Object.keys(listpnr1).forEach(key => {
      console.log(key + " for " + listpnr1[key].pnr);
      if (listpnr1[key].pnr.toUpperCase() == this.PNR.toUpperCase()) {
        this.booking = listpnr1[key];
      }
      else{
        this.booking= this.booking1;
      }

    });
  }

}

class PNRPOJO {
  pnr: string;

  constructor(pnr: string) {
    this.pnr = pnr;
  }
  welcome() {
    return "Hello, my name is " + this.pnr;
  }
}