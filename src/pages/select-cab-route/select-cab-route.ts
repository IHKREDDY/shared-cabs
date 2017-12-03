import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectedCab } from '../../app/SelectedCab';
import { Storage } from '@ionic/storage';
import { MapsUitlity } from '../../app/mapsutility.service';

/**
 * Generated class for the SelectCabRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-cab-route',
  templateUrl: 'select-cab-route.html',
  providers: [MapsUitlity]
})
export class SelectCabRoutePage {
  Origin: any;
  Destination: any;
  googleOriginName: any;
  googleDestinationName: any;
  routeCount: number = 0;
  ToAirport: boolean;
  FromAirport: boolean;
  disableNextButton:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public mapsUitlity: MapsUitlity) {
               this.ToAirport = false;
              this.FromAirport = false;
  }
  ionViewDidLoad() {
    //var objSelectedCab = new SelectedCab;
    //objSelectedCab.cabList = new Array();
    //objSelectedCab.cabList.push({route_no:1,from_loc_name:"",to_loc_name:"Dubai International Airport",lat:"",lng:"",cabType:"ToAirport"});
    // objSelectedCab.cabList.push({route_no:2,from_loc_name:"",to_loc_name:"",lat:"Chennai International Airport",lng:"",cabType:"FromAirport"});

    // this.storage.set('route_count',  this.routeCount +1);

    this.storage.get('selected_cabs').then((selected_cab) => {
      let objSelectedCab = selected_cab;
      this.storage.get('route_count').then((val) => {
        this.routeCount = val;

        objSelectedCab.cabList.forEach(route => {
          if (route.route_no == this.routeCount) {
              alert(JSON.stringify(route));
            this.disableNextButton =true;
            if (route.cabType == "ToAirport") {
              this.ToAirport = true;
              this.FromAirport = false;
              this.Destination = route.to_loc_name;
              this.Origin = route.from_loc_name;;
              this.setGoogleAutocomplete(route.cabType);
            }
            else if (route.cabType == "FromAirport") {
              this.ToAirport = false;
              this.FromAirport = true;
              this.Origin = route.from_loc_name;
              this.Destination = route.to_loc_name;
              this.setGoogleAutocomplete(route.cabType);
            }
          }
        });
      });
    });


  }

  setGoogleAutocomplete(cabType) {
    var thisClass = this;
    if (cabType == "ToAirport") {
     MapsUitlity.getGeocodeAddress(this.Destination, function (destination) {
        thisClass.googleDestinationName = destination;
      });
      console.log(document.getElementById('txtOrigin'));
      MapsUitlity.setMapsAutoComplete(document.getElementById('txtOrigin'), function (origin) {
        thisClass.googleOriginName = origin;
        thisClass.disableNextButton = false;
        MapsUitlity.displayGoogleRoute(document.getElementById('map'), thisClass.googleOriginName, thisClass.googleDestinationName);
      });
    }
    else if (cabType == "FromAirport") {
      MapsUitlity.getGeocodeAddress(this.Origin, function (origin) {
        thisClass.googleOriginName = origin;
      });

      MapsUitlity.setMapsAutoComplete(document.getElementById('txtDestination'), function (destination) {
        thisClass.googleDestinationName = destination;
        MapsUitlity.displayGoogleRoute(document.getElementById('map'), thisClass.googleOriginName, thisClass.googleDestinationName);
        thisClass.disableNextButton = false;
      });
    }
  }


  launchNextPage() {
    this.routeCount = this.routeCount + 1;
    this.storage.set('route_count', this.routeCount);
    this.navCtrl.push(SelectCabRoutePage);
  }
}