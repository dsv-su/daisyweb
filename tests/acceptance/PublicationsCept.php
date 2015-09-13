<?php 
$I = new AcceptanceTester($scenario);
$I->wantTo('search for publications');
$I->amOnPage('/publications.php');
$I->see('Title');
$I->see('Type of publication');
$I->see('Research area');
$I->fillField('lastName', 'Dalianis');
$I->click('Search');
$I->see('Identifying adverse drug event information in clinical notes');
