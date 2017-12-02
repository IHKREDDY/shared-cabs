import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SelectedCab  } from '../../app/SelectedCab';
import { Storage } from '@ionic/storage';
import {MapsUitlity} from '../../app/mapsutility.service';

/**
 * Generated class for the SelectCabRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-cab-route',
  templateUrl: 'select-cab-route.html',
  providers:[MapsUitlity]
})
export class SelectCabRoutePage {
 Origin: any;
 Destination: any;
 googleOriginName:any;
 googleDestinationName:any;
 routeCount : number = 0;
 ToAirport:boolean;
 FromAirport:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,public storage :Storage,public mapsUitlity:MapsUitlity) {
    
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
        alert(JSON.stringify( objSelectedCab.cabList));
        
       objSelectedCab.cabList.forEach(route => {
       console.log(route.route_no +"  " +this.routeCount);

       if(route.route_no == this.routeCount)
       {
         if(route.cabType == "ToAirport")
         {
         this.ToAirport = true;
         this.FromAirport = false;
         this.Destination = route.to_loc_name;
         }
         else if(route.cabType == "FromAirport")
         {
         this.ToAirport = false;
         this.FromAirport = true;
         this.Origin = route.from_loc_name;
       }
      } 
    });
   }); 
 });


}

launchNextPage()
{
             this.routeCount = this.routeCount + 1; 
             this.storage.set('route_count',  this.routeCount);
             this.navCtrl.push(SelectCabRoutePage);
}
}