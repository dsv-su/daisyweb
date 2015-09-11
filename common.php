<?php
error_reporting(E_ALL);
set_error_handler(function ($severity, $message, $file, $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
});
require 'vendor/autoload.php';

use DsvSu\Daisy;

function getCurrentUrlDir()
{
    $port = $_SERVER['SERVER_PORT'];
    return '//' . $_SERVER['SERVER_NAME'] .
            ($port != 80 && $port != 443 ? ":$port" : '') .
            rtrim(dirname($_SERVER['PHP_SELF']), '/');
}

function inEnglish()
{
    return isset($_GET['lang']) && $_GET['lang'] === 'en';
}

function getLanguage()
{
    return inEnglish() ? 'en' : 'sv';
}

function getTwigEnv()
{
    $loader = new Twig_Loader_Filesystem(dirname(__FILE__) . '/tmpl');
    return new Twig_Environment(
        $loader,
        [
            'cache' => dirname(__FILE__) . '/cache',
            'auto_reload' => true
        ]
    );
}

header('Access-Control-Allow-Origin: *');
Daisy\Client::initUsingConfigFile(dirname(__FILE__) . '/daisy_api.json');
