var map;
var car_images = ['http://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-uberx.png','http://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-black.png','http://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-uberxl2.png','http://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-suv.png'];
function getLocation()
{
  $('.fa-location-arrow').removeClass('fa-location-arrow').addClass('fa-spinner fa-spin');
  var myNode = document.getElementById("info");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  GMaps.geolocate({     
    success: function(position){
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      map.setCenter(latitude, longitude);
      map.setZoom(16);
      map.removeMarkers();
      map.addMarker({
        lat: latitude,
        lng: longitude,
        title: latitude + ', ' + longitude,
        infoWindow: {
          content: '<p>You are here.</p>'
        }
      });
      $.get('/livedata/'+latitude+'/'+longitude,function(data){
        $('.fa-spinner').removeClass('fa-spinner fa-spin').addClass('fa-location-arrow');
        data = JSON.parse(data);
        car_list = data['times'];
        if (car_list.length > 0)
        {
          var result = '';
          result = result + '<h3>Available cars</h3>';
          result = result + '<div class="table-responsive"><table class="table table-striped"><thead><tr><th>Car Type</th><th>ETA</th><th></th></tr></thead><tbody>';
          for (var i=0; i < car_list.length; i++)
          {
            var car_name = car_list[i]['display_name'];
            var car_image_url;
            var car_eta = Math.round((car_list[i]['estimate']/60)*10)/10;
            if (car_name == 'uberX')
              car_image_url = car_images[0];
            else if (car_name == 'UberBLACK')
              car_image_url = car_images[1];
            else if (car_name == 'uberXL')
              car_image_url = car_images[2];
            else if (car_name == 'UberSUV')
              car_image_url = car_images[3];
            result = result + '<tr><td>' + car_name + '</td><td>' + car_eta + ' minutes</td><td><img src="' + car_image_url +'" /></td></tr>';
          }
          result = result + '</tbody></table></div>'; 
          $(result).appendTo('#info').fadeIn('normal');
          $('html, body').animate({scrollTop: $("#info").offset().top}, 1000);
        }
        else {
          $('<p>Sorry, no cars available at present.</p>').appendTo('#info').fadeIn('normal');
          $('html, body').animate({scrollTop: $("#info").offset().top}, 1000)
        }
  })
    },     
    error: function(error){    
      alert('Geolocation failed: ' + error.message);   
    },     
    not_supported: function(){    
      alert("Your browser does not support geolocation");     
    },     
    always: function(){    
    }    
  });
}

function refreshCars()
{
  $('.fa-refresh').addClass('fa-spin');
  var myNode = document.getElementById("info");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  $.get('http://' + window.location.host + '/livedata/'+latitude+'/'+longitude,function(data){
    $('.fa-refresh').removeClass('fa-spin');
    data = JSON.parse(data);
    car_list = data['times'];
    if (car_list.length > 0)
        {
          var result = '';
          result = result + '<h3>Available cars</h3>';
          result = result + '<div class="table-responsive"><table class="table table-striped"><thead><tr><th>Car Type</th><th>ETA</th><th></th></tr></thead><tbody>';
          for (var i=0; i < car_list.length; i++)
          {
            var car_name = car_list[i]['display_name'];
            var car_image_url;
            var car_eta = Math.round((car_list[i]['estimate']/60)*10)/10;
            if (car_name == 'uberX' || car_name == 'UberX')
              car_image_url = car_images[0];
            else if (car_name == 'UberBLACK')
              car_image_url = car_images[1];
            result = result + '<tr><td>' + car_name + '</td><td>' + car_eta + ' minutes</td><td><img src="' + car_image_url +'" /></td></tr>';
          }
          result = result + '</tbody></table></div>'; 
          $(result).appendTo('#info').fadeIn('normal');
          $('html, body').animate({scrollTop: $("#info").offset().top}, 1000);
        }
        else {
          $('<p>Sorry, no cars available at present.</p>').appendTo('#info').fadeIn('normal');
          $('html, body').animate({scrollTop: $("#info").offset().top}, 1000)
        }
  })
}
$(document).ready(function(){
map = new GMaps({
  div: '#map',
  lat: 12.946550,
  lng: 77.600615,
  zoom: 10,
  scrollwheel: false
});

var styles = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];

map.addStyle({
  styledMapName:"Styled Map",
  styles: styles,
  mapTypeId: "light-dream"
});
map.setStyle("light-dream");

});