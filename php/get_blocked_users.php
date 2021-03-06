<?php

//This file is autogenerated. See modules.json and autogenerator.py for details

/*
    get_blocked_users.php

    MediaWiki API Demos
    Demo of `Blocks` module: GET request to list recent blocked users.

    MIT License
*/

$endPoint = "https://en.wikipedia.org/w/api.php";
$params = [
    "action" => "query",
    "format" => "json",
    "list" => "blocks",
    "bklimit" => "3",
    "bkprop" => "id|user|by|timestamp|expiry|reason|range|flags"
];

$url = $endPoint . "?" . http_build_query( $params );

$ch = curl_init( $url );
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
$output = curl_exec( $ch );
curl_close( $ch );

$result = json_decode( $output, true );
var_dump( $result["query"]["blocks"] );
