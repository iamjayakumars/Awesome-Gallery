selectTheme( 'themeSelector', 'themeStylesheet', 'themes/' );

AG.init({
  $image: '#mainPhoto',
  $$images: '.photo',
  $gallery: '#gallery',
  $desc: '#description'
}).fullScreen({
  $button: '#fullScreenButton'
});
