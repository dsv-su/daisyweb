<?php
require '../common.php';

use DsvSu\Daisy;
use DsvSu\Daisy\Semester;

$en = inEnglish();
$lang = getLanguage();
$conf = parse_ini_file('../semesters.conf');

$start = Semester::parse($conf['start']);
$end = Semester::parse($conf['end']);
$semester = Semester::parse($conf['current']);

if (isset($_GET['term'])) {
    try {
        $semester = Semester::parse($_GET['term']);
    } catch (DomainException $e) {
        // keep default value
    }
}

$csis = Daisy\CourseSegmentInstance::find([
    'department' => 4,
    'semester' => $semester
]);
$c = new Collator('sv_SE');

usort($csis, function ($a, $b) use ($c) {
    return $c->compare($a->getName(), $b->getName());
});

$schedule_icon = getCurrentUrlDir() . '/img/date-time.png';

function semesters($start, $end)
{
    for ($s = $start; $s != $end; $s = $s->getNext()) {
        yield $s;
    }
    yield $end;
}

$twig = getTwigEnv();

$twig->addFilter(
    new Twig_SimpleFilter('csi_name', function ($csi) use ($lang) {
            return $csi->getName($lang);
        })
);

$twig->display(
    'course_segments.html.twig',
    [
        'en' => inEnglish(),
        'xhr' => isXhr(),
        'schedule_icon' => $schedule_icon,
        'semester' => $semester,
        'semesters' => semesters($start, $end),
        'csis' => $csis,
    ]
);
