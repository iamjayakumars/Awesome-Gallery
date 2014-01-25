function calcDistance( x, y ) {
var dLat = rad( this.getLatitude() -
			location.getLatitude() ),
			dLon = rad( this.getLongitude() -
				location.getLongitude() ),

			R = 6371,

			a = Math.pow(Math.sin( dLat/2 ), 2) +
				( Math.cos( rad(this.getLatitude()) ) *
				Math.cos( rad(location.getLatitude()) ) *
				Math.pow(Math.sin( dLon/2 ), 2) ),
			c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		return R * c;
}

AG.extend(function ( $ ) {
  
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		currentLocation.setLongitude( position.coords.longitude );
		currentLocation.setLatitude( position.coords.latitude );
	}, function(error) {
		switch(error.code) {
			case error.UNKNOWN_ERROR: errString = "Unknown error!";
				break;
			case error.PERMISSION_DENIED: errString = "Canceled by user!";
				break;
			case error.POSITION_UNAVAILABLE: errString = "Position unavailable!";
				break;
			case error.TIMEOUT: errString = "Timeout!";
		}
		document.querySelector("#noLocation").innerHTML = errString;
	});
} else {
	document.querySelector("#noGeolocation").innerHTML = "Geolocation is not supported!";
}
}, 'location' );