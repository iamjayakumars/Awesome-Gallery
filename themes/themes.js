function selectTheme( selectorId, cssLinkId, baseUrl ) {
  var THEME_INDEX = 'themeIndex';
  
  var themeSelector = document.getElementById( selectorId ),
    link = document.getElementById( cssLinkId );
  
  function applyTheme() {
    link.href = baseUrl + themeSelector.options[themeSelector.selectedIndex].value + '.css';
    localStorage.setItem( THEME_INDEX, themeSelector.selectedIndex );
  }
  
  themeSelector.addEventListener( 'change', applyTheme );
  themeSelector.selectedIndex = localStorage.getItem( THEME_INDEX );
  applyTheme();
}