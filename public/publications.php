<?php
require '../common.php';

use DsvSu\Daisy;

function weed_out(&$array, $key)
{
    if (isset($array[$key])) {
        $array[$key] = array_filter($array[$key], function ($val) {
                return !empty($val);
            });
    }
}

$params = filter_input_array(
    INPUT_GET,
    [
        'title' => FILTER_DEFAULT,
        'lastName' => FILTER_DEFAULT,
        'firstName' => FILTER_DEFAULT,
        'type' => [
            'filter' => FILTER_DEFAULT,
            'flags' => FILTER_REQUIRE_ARRAY,
        ],
        'researchArea' => [
            'filter' => FILTER_VALIDATE_INT,
            'flags' => FILTER_REQUIRE_ARRAY | FILTER_NULL_ON_FAILURE,
        ],
        'from' => [
            'filter' => FILTER_VALIDATE_INT,
            'flags' => FILTER_NULL_ON_FAILURE,
        ],
        'until' => [
            'filter' => FILTER_VALIDATE_INT,
            'flags' => FILTER_NULL_ON_FAILURE,
        ],
    ]
);

if (empty($params)) {
    $params = [];
}

weed_out($params, 'type');
weed_out($params, 'researchArea');

$commit = filter_input(INPUT_GET, 'commit', FILTER_VALIDATE_BOOLEAN);
$included = filter_input(INPUT_GET, 'included', FILTER_VALIDATE_BOOLEAN);

$error = null;
$publications = null;

if ($commit || $included) {
    try {
        $publications = Daisy\Publication::find($params);
    } catch (Daisy\ServerException $e) {
        $error = $e->getMessage();
    }
}

$twig = getTwigEnv();

$twig->addFilter(new Twig_SimpleFilter('format_authors', function ($pub) {
    $getnames = function ($c) {
        if ($c->getFirstName()) {
            return mb_substr($c->getFirstName(), 0, 1)
                . '. ' . $c->getLastName();
        } else {
            return $c->getLastName();
        }
    };

    $authors = array_map($getnames, $pub->getContributors());
    if (count($authors) > 2) {
        return implode(', ', array_slice($authors, 0, -1))
            . ' and ' . end($authors);
    } else {
        return implode(' and ', $authors);
    }
}));

$pubcount = 0;
try {
    $pubcount = count($publications);
} catch(ErrorException $e) {
    error_log(print_r($publications, true));
}

$twig->display(
    'publications.html.twig',
    $params + [
        'commit' => $commit,
        'included' => $included,
        'error' => $error,
        'allPublicationTypes' => Daisy\PublicationType::getAll(),
        'allResearchAreas' => Daisy\ResearchArea::getAll(),
        'publications' => $publications,
        'total_count' => $pubcount,
        'first_item' => 1,
        'last_item' => $pubcount,
    ]
);
