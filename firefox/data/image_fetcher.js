let images = document.getElementsByTagName( 'img' );
self.port.emit( 'images', [].splice.call( images, 0, images.length ) );
