import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SelectedCab } from '../../app/SelectedCab';
import { SelectCabRoutePage } from '../select-cab-route/select-cab-route';
import {SelectRoute1Page} from '../select-route1/select-route1';


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
  //getbookingForm:FormGroup;

  booking =
  {
    "pnr": "",
    "paxes": [{ " ": " ", "": " " }],
    "travelplans": [],
  };
  routeCount: number;
  PNR: any;
  LName: any;
  listPNR;
  selectedCab: SelectedCab;
  pnrNotFound: boolean;
  displayWarning: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public storage: Storage) {
    this.pnrNotFound = true;
    //clear storage
    this.storage.clear();

  }



  getPNRDetails() {
    this.http.get('assets/data/get-pnr.json')
      .subscribe(res => this.setCabOptions(res.json()));
  }
  setCabOptions(jsonObj: any) {

    var BreakException = {};
    this.pnrNotFound = true;
    this.displayWarning = false;
    try {
      jsonObj.forEach(element => {
        if (element.pnr.toUpperCase() == this.PNR.toUpperCase()) {
          element.paxes.forEach(pax => {
            if (pax.lastname.toUpperCase() == this.LName.toUpperCase()) {
              this.booking = element;
              this.pnrNotFound = false;
              throw BreakException;
            }
          });
        }
      });
      if (this.pnrNotFound) {
        this.displayWarning = true;
      }
    } catch (e) {
      if (e !== BreakException) throw e;
    }

  }

  launchSelectCabPage() {
    this.getSelectedCabs();

    this.routeCount = 1;
    this.storage.set('route_count', this.routeCount);

    this.navCtrl.push(SelectRoute1Page);

  }


  getSelectedCabs() {
    var objSelectedCab = new SelectedCab;
    objSelectedCab.cabList = new Array();
    let cab_route_no = 0;
    this.booking.travelplans.forEach(travelplan => {
      if (travelplan.tocab_selected == true) {
        cab_route_no = cab_route_no + 1;
        objSelectedCab.cabList.push({ route_no: cab_route_no, from_loc_name: "", to_loc_name: travelplan.origin_airport, from_coordinates: "", to_coordinates: "", cabType: "ToAirport" });
      }
      if (travelplan.fromcab_selected == true) {
        cab_route_no = cab_route_no + 1;
        objSelectedCab.cabList.push({ route_no: cab_route_no, from_loc_name: travelplan.destination_airport, to_loc_name: " ", from_coordinates: "", to_coordinates: "", cabType: "FromAirport" });
      }

    });

    this.storage.set('selected_cabs', JSON.stringify(objSelectedCab));
  }



}

