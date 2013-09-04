(function () {

"use strict";

var ua = navigator.userAgent,
  supportedBrowsers = [
    new Browser('Firefox', 16.0),
    new Browser('Chrome', 26.0),
    new Browser('Trident', 10.0),
    new Browser('Safari', 3.0),
    new Browser('Opera', 12.10)
  ];

function Browser(lowercaseName, version) {
  this.name = lowercaseName;
  this.minVersion = version;
}

function version(nameIndex) {
  var rvIndex = ua.indexOf('rv:'),
    versionIndex = ua.lastIndexOf('/', nameIndex) + 1,
    versionStr = rvIndex !== -1 ?
      ua.substring(rvIndex + 3, ua.indexOf(')')) :
      ua.substring(versionIndex, ua.indexOf(' ', versionIndex));
  return parseFloat(versionStr);
}

supportedBrowsers.some(function (browser) {
  var nameIndex = ua.indexOf(browser.name);
  if (nameIndex !== -1 && version(nameIndex) >= browser.minVersion) {
    $('#browserNotSupported').removeClass('show');
    if (browser.name === 'Chrome') {
      $('.sub3').addClass('chrome');
    } else if (browser.name === 'Trident') {
      $('.hover').addClass('trident');
    }
    return true;
  }
  return false;
});

})();