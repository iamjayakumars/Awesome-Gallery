<?php

require_once 'gh_updater.php';

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    
    <title>Awesome Gallery Updater</title>
  </head>
  <body>
    <main class="main" role="main">
      <?php
      
      if (isset($_POST['submit'])) {
      
      ?>
      <form id="login" class="login" action="<?php __FILE__; ?>" method="POST">
        <input id="email" class="field" type="text" name="email" />
        <label for="email" class="label">Email</label>
        <input id="password" class="field" type="password" name="password" />
        <label for="password" class="label">Password</label>
        <input class="button" type="submit" value="Login!" name="submit" />
      </form>
      <?php
      
      } else {
      
      ?>
      <a class="linkButton" href="<?php echo __FILE__; ?>?run_update=1">
        <span class="linkButtonText">Update!</span>
      </a>
      <?php
      
        if (AGUpdater::download_update( $_SERVER['DOCUMENT_ROOT'] ) !== false) {
          
          ?>
          Awesome Gallery has just been updated to the latest version!
          <?php
          
        } else {
          
          ?>
          Update falied. Please try later. :-(
          <?php
          
        }
      }
      
      ?>
    </main>
  </body>
</html>
