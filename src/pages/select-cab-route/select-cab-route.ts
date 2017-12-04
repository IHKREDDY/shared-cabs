import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectedCab } from '../../app/SelectedCab';
import { Storage } from '@ionic/storage';
import { MapsUitlity } from '../../app/mapsutility.service';
import { NgZone } from '@angular/core';
import { ViewController } from 'ionic-angular';

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
  disableNextButton: boolean;
  zone: any;
  autocomplete: any;
  autolistner: any;
  viewCtrl:ViewController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public mapsUitlity: MapsUitlity) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    console.log('con  ' + this.autocomplete);
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
      this.disableNextButton = true;
      this.storage.get('route_count').then((val) => {
        this.routeCount = val;

        objSelectedCab.cabList.forEach(route => {
          if (route.route_no == this.routeCount) {
            this.zone.run(() => {
              if (route.cabType == "ToAirport") {
                this.Destination = route.to_loc_name;
                this.Origin = route.from_loc_name;;
                this.setGoogleAutocomplete(route.cabType);
              }
              else if (route.cabType == "FromAirport") {
                this.Origin = route.from_loc_name;
                this.Destination = route.to_loc_name;
                this.setGoogleAutocomplete(route.cabType);
              }
            });
          }
        });
      });
    });


  }

  setGoogleAutocomplete(cabType) {
    var thisClass = this;
    if (cabType == "ToAirport") {
      MapsUitlity.getGeocodeAddress(this.Destination, function (destination) {
        thisClass.zone.run(() => {
          thisClass.googleDestinationName = destination;
        });
      });

      this.zone.run(() => {
        MapsUitlity.setMapsAutoComplete(document.getElementById('txtOrigin'), function (origin, autocomplete, autolistner) {
          thisClass.zone.run(() => {
            thisClass.googleOriginName = origin;
            thisClass.disableNextButton = false;
            thisClass.autocomplete = autocomplete;
            thisClass.autolistner = autolistner;
           // thisClass.ToAirport = true;
           // thisClass.FromAirport = false;
            MapsUitlity.displayGoogleRoute(document.getElementById('map'), thisClass.googleOriginName, thisClass.googleDestinationName);
          });
        });
      });
    }
    else if (cabType == "FromAirport") {
      MapsUitlity.getGeocodeAddress(this.Origin, function (origin) {
        thisClass.zone.run(() => {
          thisClass.googleOriginName = origin;
        });
      });

      this.zone.run(() => {
        MapsUitlity.setMapsAutoComplete(document.getElementById('txtOrigin'), function (destination, autocomplete, autolistner) {
          thisClass.zone.run(() => {
            thisClass.googleDestinationName = destination;
            thisClass.autocomplete = autocomplete;
            thisClass.autolistner = autolistner;
          //  thisClass.ToAirport = false;
            //thisClass.FromAirport = true;
            MapsUitlity.displayGoogleRoute(document.getElementById('map'), thisClass.googleOriginName, thisClass.googleDestinationName);
            thisClass.disableNextButton = false;
          });
        });
      });
    }
  }

  


  launchNextPage() {
    this.routeCount = this.routeCount + 1;
    this.storage.set('route_count', this.routeCount);
    MapsUitlity.removeMapsAutoComplete(this.autocomplete, this.autolistner);
    this.navCtrl.push(SelectCabRoutePage);
  }
}