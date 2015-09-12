<?php 
$I = new AcceptanceTester($scenario);
$I->wantTo('ensure that staff works');
$I->amOnPage('/staff.php');
$I->see('E-post');
