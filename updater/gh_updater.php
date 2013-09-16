<?php

class AGUpdater {
  
  const URL_BASE = 'https://api.github.com/repos/:dannydes/:Awesome-Gallery/downloads';
  
  private static function get_latest_download() {
    $downloads = json_decode( file_get_contents( self::URL_BASE ) );
    $most_recent = $downloads[0];
    for ($index = 1; $index < sizeof( $downloads ); $index++) {
      if ($downloads[$index]->id > $most_recent->id) {
        $most_recent = $downloads[$index];
      }
    }
    return $most_recent;
  }
  
  public static function download_update( $recepient_dir ) {
    $code = file_get_contents( self::URL_BASE . '/:' . self::get_latest_download() );
    file_put_contents( $recepient_dir . '/awesome-gallery-min.js' );
  }
  
}

?>