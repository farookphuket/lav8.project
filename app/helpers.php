<?php

use Jenssegers\Agent\Agent;
use hisorange\BrowserDetect\Parser as Browser;


function xx_clean($str){

    $pattern = array("<script>","</script>");
    $repl = array("&lt;script&gt;%&gt;","&lt;br&gt;&lt;/script&gt;");

    return str_replace($pattern,$repl,$str);

}


// getUserIp
function getUserIp(){
    return Request::ip();
}

// get browser 
function getUserBrowser(){
  //  return Request::userAgent();
    $agent = new Agent();

    $browser = $agent->browser();
    $browser_ver = $agent->version($browser); 
    return $browser.' '.$browser_ver;

}

function getUserOs(){
  $agent = new Agent();
  $platform = $agent->platform();
  $platform_ver = $agent->version($platform);
  return $platform.' '.$platform_ver; 
}

function getUserDevice(){
  $agent = new Agent();
  $device = $agent->device();
  //dd($device);
  return $device;
}

function OS(){
  $os_name = Browser::platformFamily();
  $os_ver = Browser::platformVersion();
  return $os_name.' '.$os_ver;
}
