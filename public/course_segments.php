<?php
// -*- web -*-
require '../common.php';

use DsvSu\Daisy;

$en = (isset($_GET['lang']) && $_GET['lang'] === 'en');
$lang = $en ? 'en' : 'sv';
$conf = parse_ini_file('../semesters.conf');
$semester = new Daisy\Semester(2015, Daisy\Semester::SPRING);
$csis = Daisy\CourseSegmentInstance::find([
    'department' => 4,
    'semester' => $semester
]);
$c = new Collator('sv_SE');

usort($csis, function ($a, $b) use ($c) {
    return $c->compare($a->getName(), $b->getName());
});

$schedule_icon = getCurrentUrlDir() . '/img/date-time.png';
?>
<table class="course_units_table">
  <col class="cut_name">
  <col class="cut_timetable">
  <col class="cut_p">
  <col class="cut_time">
  <col class="cut_bet">
  <thead>
    <tr>
      <th><?= $en ? 'Course segment' : 'Delkurs' ?></th>
      <th><?= $en ? 'Timetable' : 'Schema' ?></th>
      <th><?= $en ? 'Credits' : 'hp' ?></th>
      <th><?= $en ? 'Date' : 'Datum' ?></th>
      <th><?= $en ? 'Code' : 'Beteckning' ?></th>
    </tr>
  </thead>
  <tbody>
    <?php foreach ($csis as $csi): ?>
      <tr>
        <td><a href="<?=h($csi->getDaisyPopupUrl())?>"
               class="daisy" target="_blank"
               ><?=h($csi->getName($lang))?></a></td>
        <td class="timetable"
            ><a href="<?=h($csi->getDaisyScheduleUrl())?>"
                class="daisy" target="_blank"
                ><img src="<?=h($schedule_icon)?>" width="16" height="16"
                      alt="<?=$en ? 'Timetable' : 'Schema'?>"
                      title="<?=$en ? 'Timetable' : 'Schema'?>"></a></td>
        <td><?=$en ? $csi->getCredits() : str_replace('.', ',', $csi->getCredits())?></td>
        <td><?=$csi->getStartDate()->format('j/n')
            ?> - <?=$csi->getEndDate()->format('j/n')?></td>
        <td><?=h($csi->getDesignation())?></td>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>
