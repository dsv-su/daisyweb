<?php
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
    $loader = new Twig_Loader_Filesystem(dirname(__FILE__) . '/twig');
    return new Twig_Environment(
        $loader,
        [
            'cache' => dirname(__FILE__) . '/cache',
            'auto_reload' => true
        ]
    );
}

function isXhr()
{
    return !empty($_SERVER['HTTP_ORIGIN'])
            || (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
                && 'xmlhttprequest' ===
                strtolower($_SERVER['HTTP_X_REQUESTED_WITH']));
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *, Accept-Encoding, Cache-Control'); // Behövs för Safari
Daisy\Client::initUsingConfigFile(dirname(__FILE__) . '/daisy_api.json');
