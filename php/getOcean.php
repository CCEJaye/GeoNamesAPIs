<?php
	ini_set("display_errors", "On");
	error_reporting(E_ALL);

    $startTime = microtime(true);

    $url = "http://api.geonames.org/oceanJSON?" 
            . "lat=" . $_REQUEST["lat"]
            . "&lng=" . $_REQUEST["lng"]
            . "&radius=" . $_REQUEST["radius"]
            . "&lang=" . $_REQUEST["lang"]
            . "&username=charlesj";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "getOcean success";
    $output['status']['returnedIn'] = (microtime(true) - $startTime) * 1000 . " ms";
	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output);
?>
