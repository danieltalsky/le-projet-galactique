<?php 

// designed to accept the VERY specific format of THE SHUFFLER and quietly save it to a unique json filename

function isValidJSON($str) {

    json_decode($str);

    return json_last_error() == JSON_ERROR_NONE;

 }

 

 $json_params = file_get_contents("php://input");

 

 if (strlen($json_params) > 0 && isValidJSON($json_params)) {

   $shuffler = json_decode($json_params);

 } else {

    header('HTTP/1.1 403 Forbidden'); exit('Bad payload');   

 }



$sekrets = file('/home/danielta/specialdelivery/sekrets/sekret'); 

if (

    

    trim($shuffler->username) 

    == 

    trim($sekrets[0]) 

    

    and 

    

    trim($shuffler->password) 

    == 

    trim($sekrets[1])

) 

{

    $contents = json_encode($shuffler->theShuffle, JSON_PRETTY_PRINT);

    $d = new DateTime();

    $filename_title = $shuffler->theShuffle->title;

    $filename_title = mb_ereg_replace("[^A-Za-z0-9]","_",$filename_title);

    $filename = $d->format('Y-m-d-H-i-s-u_') . $filename_title . '.json';

    $filepath = __DIR__ . "/submissions/" . $filename;

    file_put_contents($filepath, $contents);

    http_response_code(200); die('{"message": "Shuffle Accepted"}'); 

} else {

    http_response_code(403); die('Bad Authorization: - ' . $shuffler->username . " : " . $shuffler->password); 

}