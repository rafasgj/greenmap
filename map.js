//map
function show_map(latitude, longitude) {
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var gps = new google.maps.LatLng(latitude, longitude);
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      zoom:15,
      center: gps,
      streetViewControl: false,
      panControl: true,
      overviewMapControl: true,
      zoomControl: true,
      scaleControl: true
    }
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    var marker = new google.maps.Marker({
                  position: gps,
                  map: map,
                  title:"Localização Atual"
    });

    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('search-route')),
        { types: ['geocode'] });
    // When the user selects an address from the dropdown,
    // populate the address fields in the form.
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      calcRoute();
    });

    document.getElementById("search-route").addEventListener("keypress", function(e){
        if (e.keyCode == 13) {
            calcRoute();
            return false;
        }
    });
}

show_map(0,0)

function calcRoute(starte) {
  var start = document.getElementById("search-route").value;
  if(starte != undefined) {
    start = starte;
  }
  var end = gps;
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    directionsDisplay.setDirections(response);
  }
  });
}
