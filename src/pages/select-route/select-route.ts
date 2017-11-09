import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SelectRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-select-route',
  templateUrl: 'select-route.html',
})
export class SelectRoutePage {

 currentOrigin :string;
 currentDestination:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.currentOrigin = this.navParams.get('currentOrigin');
  this.currentDestination = this.navParams.get('currentDestination');
  }

  ionViewDidEnter() {
 this.DisplayRoute();
}

    DisplayRoute() {
       var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map1'), {
          zoom: 17,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);
        
        directionsService.route({
          origin: this.currentOrigin,
          destination: this.currentDestination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

}
