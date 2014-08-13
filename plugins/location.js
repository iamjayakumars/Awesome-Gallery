(function ( document, navigator ) {

  function calcDistance( x1, y1, x2, y2 ) {
    var dLat = rad( y1 - y2 ),
      dLon = rad( x1 - x2 ),

      R = 6371,

      a = Math.pow( Math.sin( dLat/2 ), 2 ) +
        ( Math.cos( rad( y1 ) ) * Math.cos( rad( y2 ) ) *
        Math.pow( Math.sin( dLon/2 ), 2 ) ),
      c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1-a ) );

    return R * c;
  }

  function rad( degrees ) {
  	return degrees * ( Math.PI / degrees );
  }

  AG.extend(function ( $, options ) {
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(function( position ) {
        document.querySelector( options.$distance ).textContent = calcDistance( position.coords.longitude, position.coords.latitude,
                            AG.location.longitude, AG.location.latitude );
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
