<?php
require '../common.php';

use DsvSu\Daisy;
use libphonenumber\PhoneNumber;
use libphonenumber\PhoneNumberUtil;
use libphonenumber\PhoneNumberFormat;

$employees = Daisy\Employee::find(['department' => 4]);
$c = new Collator('sv_SE');

usort($employees, function ($a, $b) use ($c) {
    $ap = $a->getPerson();
    $bp = $b->getPerson();
    return $c->compare($ap->getLastName(), $bp->getLastName()) ?:
           $c->compare($ap->getFirstName(), $bp->getFirstName());
});

?>
<table class="dsv-staff-table-new">
  <col class="c_last_name">
  <col class="c_first_name">
  <col class="c_email">
  <col class="c_work_phone">
  <col class="c_office">
  <thead>
    <tr>
      <th data-sort-initial="true" data-class="expand" data-type="swedish">Efternamn</th>
      <th data-type="swedish">Förnamn</th>
      <th data-hide="phone,bigphone">E-post</th>
      <th data-hide="phone">Telefon</th>
      <th data-hide="phone,bigphone,tablet">Rum</th>
    </tr>
  </thead>
  <tbody>
    <?php foreach ($employees as $e): ?>
      <?php $p = $e->getPerson(); ?>
      <tr>
        <td><a class="daisy" href="<?=h($p->getDaisyPopupUrl())?>"
               target="_blank"><?=h($p->getLastName())?></a></td>
        <td><a class="daisy" href="<?=h($p->getDaisyPopupUrl())?>"
               target="_blank"><?=h($p->getFirstName())?></a></td>
        <td><a href="mailto:<?=h($p->getMail())?>"><?=h($p->getMail())?></a></td>
        <?php if ($e->getWorkPhone() instanceof PhoneNumber): ?>
          <td><a href="tel:<?=h(strval($e->getWorkPhone()))?>"
                 ><?=h(PhoneNumberUtil::getInstance()->format(
                     $e->getWorkPhone(),
                     PhoneNumberFormat::NATIONAL
                  ))?></a></td>
        <?php else: ?>
          <td><?=h($e->getWorkPhone())?></td>
        <?php endif; ?>
        <td><?=h($e->getOffice())?></td>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>