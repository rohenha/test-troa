<?php
// PUNK Client

Class Punk {
  private $url;

  public function __construct() {
    $this->url = "https://api.punkapi.com/v2/beers/";
  }

  public function requestURL($params) {

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $this->url.$params ); //Url together with parameters
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //Return data instead printing directly in Browser
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT , 7); //Timeout after 7 seconds
    curl_setopt($ch, CURLOPT_USERAGENT , "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)");
    curl_setopt($ch, CURLOPT_HEADER, 0);
    
    $result = curl_exec($ch);
    curl_close($ch);

    if(curl_errno($ch))
      echo 'Curl error: ' . curl_error($ch);
    else
      header_remove();
      header("Content-Type: application/json");
      http_response_code(200);
      echo json_encode($result);
      exit();  
  }

  public function getBeers() {
    $this->requestURL("");
  }
  
  public function getBeer($id){
    $this->requestURL($id);
  }
}

