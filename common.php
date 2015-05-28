<?php
require 'vendor/autoload.php';

use DsvSu\Daisy;

function h($s)
{
    return htmlspecialchars($s);
}

function getCurrentUrlDir()
{
    $port = $_SERVER['SERVER_PORT'];
    return '//' . $_SERVER['SERVER_NAME'] .
            ($port != 80 && $port != 443 ? ":$port" : '') .
            dirname($_SERVER['PHP_SELF']);
}

header('Access-Control-Allow-Origin: *');
Daisy\Client::initUsingConfigFile(dirname(__FILE__) . '/daisy_api.json');
