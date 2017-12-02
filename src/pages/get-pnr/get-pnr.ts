import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import {SelectedCab  } from '../../app/SelectedCab';
import {SelectCabRoutePage} from '../select-cab-route/select-cab-route';


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
  routeCount:number;
  PNR: any;
  LName: any;
  listPNR;
  selectedCab:SelectedCab;
  pnrNotFound:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,public storage :Storage) {
     this.pnrNotFound = true;
  }



  getPNRDetails()  {
    this.http.get('assets/data/get-pnr.json')
      .subscribe(res => this.setCabOptions(res.json()));
  }
  setCabOptions(jsonObj:any) {

    var BreakException = {};
    this.pnrNotFound = true;

      try {
      jsonObj.forEach(element => {
      alert(element.pnr.toUpperCase() + ' ' + this.PNR.toUpperCase())
      if (element.pnr.toUpperCase() == this.PNR.toUpperCase())
        {
          element.paxes.forEach(pax => {
          if( pax.lastname.toUpperCase() == this.LName.toUpperCase())
          {
          this.booking = element;
          this.pnrNotFound = false;
          throw BreakException;
          }
          });
        }
   });
      } catch (e) {
      if (e !== BreakException) throw e;
   }

  }

  launchSelectCabPage()
  {
       this.getSelectedCabs();

        this.routeCount =  1; 
        this.storage.set('route_count',  this.routeCount);
        
        this.navCtrl.push(SelectCabRoutePage)
            //creating selected cab object
  }


  getSelectedCabs()
  {
        var objSelectedCab = new SelectedCab;
        objSelectedCab.cabList = new Array();
        let cab_route_no = 0;
        this.booking.travelplans.forEach(travelplan => {
        alert(JSON.stringify(travelplan));
        alert("to " +travelplan.tocab_selected);
        alert("from " + travelplan.fromcab_selected);
        if(travelplan.tocab_selected == true)
        {
         cab_route_no = cab_route_no +1;
         objSelectedCab.cabList.push({route_no:cab_route_no,from_loc_name:"",to_loc_name:travelplan.origin_airport,lat:"",lng:"",cabType:"ToAirport"});
        }
        if(travelplan.fromcab_selected == true)
        {
         cab_route_no = cab_route_no +1;
         objSelectedCab.cabList.push({route_no:cab_route_no,from_loc_name:travelplan.destination_airport,to_loc_name:" ",lat:"",lng:"",cabType:"FromAirport"});
        }
        
      });
      
      alert(objSelectedCab.cabList.length);
      this.storage.set('selected_cabs',  objSelectedCab);
  }



}

