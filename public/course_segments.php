<?php
require '../common.php';

use DsvSu\Daisy;
use DsvSu\Daisy\Semester;

$en = inEnglish();
$lang = getLanguage();

#
#  Set first, last and current semester based on the following:
#
#  jan-jul: spring semester is current
#  aug-dec: fall semester is current
#
#  jan-apr, aug-nov: first semester is 3 back, last semester is current
#  may-jul, dec:     first semester is 2 back, last semester is 1 forward
#
$now = new DateTimeImmutable();
$month = $now->format('n');
$year = $now->format('Y');

$start = 'ht'.($year-2);
$semester = 'vt'.$year;
$end = $semester;
if($month > 4) {
    $start = 'vt'.($year-1);
    $end = 'ht'.$year;
    if($month > 7) {
        $semester = 'ht'.$year;
    }
    if($month == 12) {
        $start = 'ht'.($year-1);
        $end = 'vt'.($year+1);
    }
}

$start = Semester::parse($start);
$end = Semester::parse($end);
$semester = Semester::parse($semester);

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

// Filter out uppdragsutbildningar
$csis = array_filter($csis, function ($csi) {
        return preg_match('/^(IB|ML|MM).*U$/', $csi->getDesignation()) !== 1;
    });

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
	'lang' => getLanguage(),
        'xhr' => isXhr(),
        'schedule_icon' => $schedule_icon,
        'semester' => $semester,
        'semesters' => semesters($start, $end),
        'csis' => $csis,
    ]
);
