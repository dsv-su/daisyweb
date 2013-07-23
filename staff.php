<?php

define('URL', 'https://daisy.dsv.su.se/sok/sokanstalldRss.jspa?institution=4');
define('PERSON_NS', 'http://daisy.dsv.su.se/rss/module/person');

// Shorter alias
function h($s) {
  return htmlspecialchars($s);
}

// Take an incomplete phone number and make it complete, with country
// code and all.
function complete_phone($p) {
  if (empty($p)) return null;
  $p = str_replace(['-', ' ', '(', ')'], '', $p);
  if (strlen($p) === 4) $p = '16' . $p;
  if ($p[0] !== '+' && $p[0] !== '0') $p = '8' . $p;
  if ($p[0] === '0') $p = substr($p, 1);
  if ($p[0] !== '+') $p = '+46' . $p;
  return $p;
}

// Take a complete phone number and produce a shortened version of it.
function short_phone($cp) {
  if (empty($cp)) return null;
  if (substr($cp, 0, 3) === '+46') $cp = '0' . substr($cp, 3);
  if (substr($cp, 0, 2) === '08') {
    $cp = substr_replace($cp, '-', 2, 0);
  } else {
    $cp = substr_replace($cp, '-', 3, 0);
  }
  return $cp;
}

// Take an office (arbetsrum) and shorten it down to just digits if
// possible.
function short_office($office) {
  if (!empty($office) && preg_match('/^(\\d+)\\D/', $office, $matches)) {
    return $matches[1];
  } else {
    return $office;
  }
}

header('Access-Control-Allow-Origin: http://dsv.su.se');

$data = file_get_contents(URL);
$rss = simplexml_load_string($data);
?>
<meta charset="UTF-8">
<style>
@import "//www2.dsv.su.se/daisyweb/FooTable/css/footable.core.min.css";

.footable.phone a.daisy, .footable.bigphone a.daisy,
.footable.tablet a.daisy {
    color: black;
    text-decoration: none;
    pointer-events: none;
}
</style>
<label>Sök: <input id="filter" type="text"></label>
<table class="dsv-staff-table-new" data-filter="#filter">
  <col class="c_last_name">
  <col class="c_first_name">
  <col class="c_email">
  <col class="c_work_phone">
  <col class="c_office">
  <thead>
    <tr>
      <th data-sort-initial="true" data-class="expand">Efternamn</th>
      <th>Förnamn</th>
      <th data-hide="phone,bigphone">E-post</th>
      <th data-hide="phone">Telefon</th>
      <th data-hide="phone,bigphone,tablet">Rum</th>
    </tr>
  </thead>
  <tbody>
    <? foreach ($rss->channel->item as $item): ?>
    <?   $pitem = $item->children(PERSON_NS); ?>
    <?   $cp = complete_phone($pitem->arbetstelefon); ?>
    <tr>
      <td><a class="daisy" href="<?=h($item->link)?>" target="_blank"><?=h($pitem->enamn)?></a></td>
      <td><a class="daisy" href="<?=h($item->link)?>" target="_blank"><?=h($pitem->fnamn)?></a></td>
      <td><a href="mailto:<?=h($pitem->epost)?>"><?=h($pitem->epost) ?></a></td>
      <td><a href="tel:<?=h($cp)?>"><?=h(short_phone($cp))?></a></td>
      <td><?=h(short_office($pitem->arbetsrum))?></td>
    </tr>
    <? endforeach; ?>
  </tbody>
</table>
<script>initStaffTable();</script>

<!-- <script src="//www2.dsv.su.se/daisyweb/js/staff-full.js"></script> -->

<!--
<script src="//www2.dsv.su.se/daisyweb/js/jquery.min.js"></script>
<script src="//www2.dsv.su.se/daisyweb/DataTables/media/js/jquery.dataTables.min.js"></script>
<script src="//www2.dsv.su.se/daisyweb/datatables-responsive/files/js/datatables.responsive.js"></script>
<script src="//www2.dsv.su.se/daisyweb/js/staff.js"></script>
-->
