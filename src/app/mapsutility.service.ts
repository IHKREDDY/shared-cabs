import { Injectable } from '@angular/core';  


declare var google;
declare var autocomplete;

@Injectable()
export class MapsUitlity {  



static displayGoogleRoute(mapDiv,Origin,Destination) {
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
        let map = new google.maps.Map(mapDiv, {
          zoom: 17,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);
        alert(JSON.stringify(Origin));
        alert(JSON.stringify(Destination));
        directionsService.route({
          origin: Origin,
          destination: Destination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

calculateDistance(lat1, lon1, lat2, lon2, unit) {
	let radlat1 = Math.PI * lat1/180
	let radlat2 = Math.PI * lat2/180
	let theta = lon1-lon2
	let radtheta = Math.PI * theta/180
	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

setMapsAutoComplete(txtElement,displayRoute: (destination:any) => void)
{
    var nativeTxtDestination = txtElement.getElementsByTagName('input')[0];
    var autocomplete = new google.maps.places.Autocomplete(nativeTxtDestination);
    google.maps.event.addListener(autocomplete, 'place_changed', ()=> {
     var place = autocomplete.getPlace();
      displayRoute(place.geometry.location);
        });
}

} 