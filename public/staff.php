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

$twig = getTwigEnv();
$twig->addTest(new Twig_SimpleTest('phoneNumber', function ($obj) {
            return $obj instanceof PhoneNumber;
        }));
$twig->addFilter(new Twig_SimpleFilter('nationalPhoneNumber', function ($pn) {
            return PhoneNumberUtil::getInstance()->format(
                $pn,
                PhoneNumberFormat::NATIONAL
            );
        }));

$twig->display('staff.html.twig', [ 'employees' => $employees ]);
