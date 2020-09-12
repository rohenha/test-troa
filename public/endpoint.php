<?php
require("../library/Punk.php");
$punk = new Punk();
if ($_GET["id"] != "")
    $punk->getBeer($_GET["id"]);
else
    $punk->getBeers();

