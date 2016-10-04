(function ( document, navigator ) {

  var currentPosition, $distance,
    currentImageLocation = {
      longitude: 0,
      latitude: 0
    };

  function calcDistance( p1, p2 ) {
    var dLat = rad( p1.latitude - p2.latitude ),
      dLon = rad( p1.longitude - p2.longitude ),

      R = 6371,

      a = Math.pow( Math.sin( dLat/2 ), 2 ) +
        ( Math.cos( rad( p1.latitude ) ) * Math.cos( rad( p2.latitude ) ) *
        Math.pow( Math.sin( dLon/2 ), 2 ) ),
      c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1-a ) );

    return R * c;
  }

  function rad( degrees ) {
  	return degrees * ( Math.PI / degrees );
  }

  function updateImageCoords() {
  	currentImageLocation.longitude = this.getAttribute( 'longitude' );
  	currentImageLocation.latitude = this.getAttribute( 'latitude' );

    document.querySelector( $distance ).textContent = calcDistance( currentPosition, currentImageLocation );
  }

  function attachImageClickHandler( image ) {
    image.addEventListener( 'click', updateImageCoords );
  }

  AG.extend(function ( $, options ) {
  	$.dom.images.forEach( attachImageClickHandler );

    $distance = options.$distance;

    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(function( position ) {
        currentPosition = position.coords;
      }, function( error ) {
      	switch( error.code ) {
          case error.UNKNOWN_ERROR:
            errString = 'Unknown error!';
            break;
          case error.PERMISSION_DENIED:
            errString = 'Canceled by user!';
            break;
          case error.POSITION_UNAVAILABLE:
            errString = 'Position unavailable!';
            break;
          case error.TIMEOUT:
            errString = 'Timeout!';
        }
        document.querySelector( options.$locationError ).textContent = errString;
      });
    } else {
      document.querySelector( options.$locationError ).textContent = 'Geolocation is not supported!';
    }
  }, 'location' );

})( document, navigator );
