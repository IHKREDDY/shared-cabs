import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MapsUitlity } from '../../app/mapsutility.service';
import { NgZone } from '@angular/core';
import {ConfirmRoutePage} from '../confirm-route/confirm-route';
import { SelectedCab } from '../../app/SelectedCab';
/**
 * Generated class for the SelectRoute1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-route1',
  templateUrl: 'select-route1.html',
  providers: [MapsUitlity]
})
export class SelectRoute1Page {
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
  Location:any;
  HideMap:boolean;
  ShowContinue:boolean;
  selectedCab: SelectedCab = new SelectedCab();

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public mapsUitlity: MapsUitlity) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    
  }

   ionViewDidLoad() {
     this.loadNextCab();
     this.setGoogleAutocomplete();
   }
    loadNextCab() {
    //var objSelectedCab = new SelectedCab;
    //objSelectedCab.cabList = new Array();
    //objSelectedCab.cabList.push({route_no:1,from_loc_name:"",to_loc_name:"Dubai International Airport",lat:"",lng:"",cabType:"ToAirport"});
    // objSelectedCab.cabList.push({route_no:2,from_loc_name:"",to_loc_name:"",lat:"Chennai International Airport",lng:"",cabType:"FromAirport"});

    // this.storage.set('route_count',  this.routeCount +1);
   var thisClass = this;
     //clear details
     this.Location = "";
     this.Origin = "";
     this.Destination = "";
     this.HideMap = true;

     //get Cabs from storage
    this.storage.get('selected_cabs').then((selected_cab) => {
      let objSelectedCab = JSON.parse(selected_cab);
      this.disableNextButton = true;
      this.storage.get('route_count').then((val) => {
        this.routeCount = val;

        if(this.routeCount == objSelectedCab.cabList.length)
        {
          this.ShowContinue = true;
        }
        else
        {
          this.ShowContinue = false;
        }
        objSelectedCab.cabList.forEach(route => {
          if (route.route_no == this.routeCount) {
            this.zone.run(() => {
              if (route.cabType == "ToAirport") {
                this.ToAirport = true;
                this.FromAirport = false;
                this.Destination = route.to_loc_name;
                this.Origin = route.from_loc_name;
                this.getGeocodeAdsress();
              }
              else if (route.cabType == "FromAirport") {
                this.ToAirport = false;
                this.FromAirport = true;
                this.Origin = route.from_loc_name;
                this.Destination = route.to_loc_name;
                this.getGeocodeAdsress();
              }
            });
          }
        });
      });
    });
  }


  setGoogleAutocomplete() {
    var thisClass = this;
          MapsUitlity.setMapsAutoComplete(document.getElementById('txtLocation'), function (location, autocomplete, autolistner) {
          thisClass.zone.run(() => {
            thisClass.HideMap = false;
            if(thisClass.ToAirport)
            {
            thisClass.googleOriginName = location;
            thisClass.disableNextButton = false;
            MapsUitlity.displayGoogleRoute(document.getElementById('map1'), thisClass.googleOriginName, thisClass.googleDestinationName);
          }
          else if(thisClass.FromAirport)
          {
            thisClass.googleDestinationName = location;
            thisClass.disableNextButton = false;
             MapsUitlity.displayGoogleRoute(document.getElementById('map1'), thisClass.googleOriginName, thisClass.googleDestinationName);
          }
          });
        });
  }

  getGeocodeAdsress()
  {
     var thisClass = this;
    if (thisClass.ToAirport) {
      MapsUitlity.getGeocodeAddress(this.Destination, function (destination) {
        thisClass.zone.run(() => {
          thisClass.googleDestinationName = destination;
        });
      });
    }
    else if (thisClass.FromAirport) {
      MapsUitlity.getGeocodeAddress(this.Origin, function (origin) {
        thisClass.zone.run(() => {
          thisClass.googleOriginName = origin;
        });
      });
    }
  }

  updateCoordinates(currenRouteNo,redirect:()=>void)
  {
    var thisClass = this;
      this.storage.get('selected_cabs').then((selected_cab) => {
      let objSelectedCab = JSON.parse(selected_cab);
        objSelectedCab.cabList.forEach(route => {
          if (route.route_no == currenRouteNo) {
            this.zone.run(() => {
              console.log(this.googleOriginName + "   " + this.googleDestinationName);
                route.from_coordinates = this.googleOriginName;
                route.to_coordinates =this.googleDestinationName;
                thisClass.updStorage(objSelectedCab);
                redirect();
            });
          }
        });
    });
    
  }


  launchNextPage() {
    let currentRoute = this.routeCount;
    var thisClass= this;
    this.updateCoordinates(currentRoute,function()
    {
    thisClass.routeCount = thisClass.routeCount + 1;
    thisClass.storage.set('route_count', thisClass.routeCount);
    thisClass.loadNextCab();
    });
  }

 launchConfirmationPage()
  {
    var thisClass= this;
    this.updateCoordinates(this.routeCount,function()
    {
      thisClass.navCtrl.push(ConfirmRoutePage);
    });
  }

  updStorage(objSelectedCab:SelectedCab)
  {
 // this.selectedCab = objSelectedCab;
      this.storage.set('selected_cabs',JSON.stringify(objSelectedCab));
  }
}
