import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SelectRoutePage} from '../select-route/select-route'
//import {GoogleplaceDirective} from '../../app/mapsautocomplete.directive'

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
 Origin: any;
 Destination: any;
 googleOriginName:any;
 googleDestinationName:any;

 autocomplete:any;
  constructor(public navCtrl: NavController,public storage :Storage) {

  }

    calculateAndDisplayRoute() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);
        
        directionsService.route({
          origin: this.googleOriginName,
          destination: this.googleDestinationName,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      setLocation()
      { 


      }

      getLocation()
      {
        // alert(JSON.stringify(this.storage.get('UserLocation')))
      }

      launchShortestRoutePage()
      {
      let UserLocation ={
      currentOrigin: this.googleOriginName,
       currentDestination: this.googleDestinationName,
      }

        this.navCtrl.push(SelectRoutePage,UserLocation)
      }

     ngOnInit() 
      {
    //  this.setAutoComplete();
      }

      ionViewDidEnter()
      {
        //var nativeTxtOrigin = document.getElementById('txtOrigin').getElementsByTagName('input')[0];
        var nativeTxtDestination = document.getElementById('txtDestination').getElementsByTagName('input')[0];
       // new google.maps.places.Autocomplete(nativeTxtOrigin);
        this.autocomplete = new google.maps.places.Autocomplete(nativeTxtDestination);

       google.maps.event.addListener(this.autocomplete, 'place_changed', ()=> {
       var place = this.autocomplete.getPlace();
       this.googleOriginName = 'Dubai International Airport';
       this.googleDestinationName = place.name;
       this.calculateAndDisplayRoute(); 
        });
        
      }

}
