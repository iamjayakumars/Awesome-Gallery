selectTheme( 'themeSelector', 'themeStylesheet', 'style/themes/' );

AG.init({
  $image: '#mainPhoto',
  $$images: '.photo',
  $gallery: '#gallery',
  $description: '#description'
}).fullScreen({
  $button: '#fullScreenButton'
});
