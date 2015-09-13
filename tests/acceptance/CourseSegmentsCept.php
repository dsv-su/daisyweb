<?php 
$I = new AcceptanceTester($scenario);
$I->wantTo('see the table of course segments');
$I->amOnPage('/course_segments.php');
$I->see('Delkurs');
$I->see('Termin');
$I->see('Programmering');
