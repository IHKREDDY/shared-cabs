import { Injectable } from '@angular/core';  


declare var google;
declare var autocomplete;
declare var autolistner;

@Injectable()
export class MapsUitlity {  
     static getGeocodeAddress(address,setAdress: (location:any) => void) {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            // resultsMap.setCenter(results[0].geometry.location);
            // var marker = new google.maps.Marker({
            //   map: resultsMap,
            //   position: results[0].geometry.location
            // });
           setAdress(results[0].geometry.location); 
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
            setAdress('');
          }
        });
      }

static displayGoogleRoute(mapDiv,Origin,Destination) {
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
        let map = new google.maps.Map(mapDiv, {
          zoom: 17,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);
        directionsService.route({
          origin: Origin,
          destination: Destination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            MapsUitlity.intiMap(mapDiv,directionsDisplay);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

static intiMap(mapDiv,directionsDisplay)
{
      let map = new google.maps.Map(mapDiv, {
          zoom: 17,
          center: {lat: 41.85, lng: -87.65}
        });

       directionsDisplay.setMap(map);
}

static calculateDistance(lat1, lon1, lat2, lon2, unit) {
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

static setMapsAutoComplete(txtElement,displayRoute: (location:any,autocompleteref:any,autolistnerref:any) => void)
{
    var nativeTxtLocation = txtElement.getElementsByTagName('input')[0];
    var autocomplete = new google.maps.places.Autocomplete(nativeTxtLocation);
    var autolistner = google.maps.event.addListener(autocomplete, 'place_changed', ()=> {
    var place = autocomplete.getPlace();
    displayRoute(place.geometry.location,autocomplete,autolistner);
        });
}

static removeMapsAutoComplete(autocomplete,autolistner)
{
  if(autocomplete)
  {
    //autocomplete = null;
    //google.maps.event.removeListener(autocomplete);
     //google.maps.event.clearInstanceListeners(autocomplete);
  }
  if(autolistner)
  {
    google.maps.event.clearInstanceListeners(autolistner);
  }
}

} 