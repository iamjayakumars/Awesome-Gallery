let data = require( 'sdk/self' ).data,
  panel = require( 'sdk/panel' ),
  pageMod = require( 'sdk/page-mod' ),
  widget = require( 'sdk/widget' );

exports.main = function () {
  let gallery = panel.Panel({
    height: 400,
    width: 600,
    contentURL: data.url( 'gallery/index.html' ),
    contentScriptFile: data.url( 'gallery/main.js' )
  });

  pageMod.PageMod({
    include: '*',
    contentScriptFile: data.url( 'image_fetcher.js' ),
    onAttach: function ( worker ) {
      worker.port.on( 'images', function ( images ) {
        gallery.port.emit( 'images', images );
      });
    }
  });

  widget.Widget({
    id: 'awesome-gallery',
    label: 'Load gallery from page',
    contentURL: 'http://www.mozilla.org/favicon.ico',
    panel: gallery
  });
};
