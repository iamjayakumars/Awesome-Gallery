<!DOCTYPE html>
<html>
    <head>
        <title>AG Login</title>
    </head>
    <body>
        <h1 class="h1">Login to manage your Awesome Gallery!</h1>
        <?php echo validation_errors(); ?>
        <form id="loginForm" action="" method="post">
            <input type="text" id="username" class="field" name="username" required />
            <label class="label" for="username">Username (Default: root)</label>
            <input type="password" id="password" class="field" name="password" required />
            <label class="label" for="password">Password (Default: 123)</label>
            <input type="submit" class="button" name="submit" value="Login!" />
        </form>
    </body>
</html>