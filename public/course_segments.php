<?php
// -*- web -*-
require '../common.php';

use DsvSu\Daisy;
use DsvSu\Daisy\Semester;

$en = (isset($_GET['lang']) && $_GET['lang'] === 'en');
$lang = $en ? 'en' : 'sv';
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
?>
<form>
  <p>
    <label>
      <?= $en ? 'Term:' : 'Termin:' ?>
      <select onchange="$(this.form).submit()">
        <?php foreach (semesters($start, $end) as $s): ?>
          <option value="<?=$semester?>"
                  <?= $s == $semester ? ' selected' : ''?>
                  ><?=$s?></option>
        <?php endforeach; ?>
      </select>
  </p>
</form>
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
