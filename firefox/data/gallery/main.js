self.port.on( 'images', function ( images ) {
  AG.init({
    $image: '#mainPhoto',
    $imagesContainer: '#photoStrip',
    images: images,
    $gallery: '#gallery',
    $desc: '#description'
  });
});
