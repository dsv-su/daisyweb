<?php
require 'vendor/autoload.php';

use DsvSu\Daisy;

function h($s)
{
    return htmlspecialchars($s);
}

header('Access-Control-Allow-Origin: *');
Daisy\Client::initUsingConfigFile(dirname(__FILE__) . '/daisy_api.json');
