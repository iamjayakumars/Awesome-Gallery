AG.extend(function ( $ ) {
  for ( var property in $ ) {
    AG[property] = $[property];
  }
});
