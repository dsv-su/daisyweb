<?php 
$I = new AcceptanceTester($scenario);
$I->wantTo('see the staff list');
$I->amOnPage('/staff.php');
$I->see('E-post');
$I->see('Olofsson');

$I->amOnPage('/staff.php?lang=en');
$I->see('Email');
