<?php
// required header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include database and object files
include_once '../../../config/database.php';
include_once '../../../objects/district.php';
include_once '../../../objects/ward.php';

// instantiate database and district object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$district = new District($db);

$ward = new Ward($db);

$district->id = isset($_GET['district_id']) ? $_GET['district_id'] : die();
  
// query districts
$stmt = $ward->read_with_district_id($district->id);
$num = $stmt->rowCount();
  
// check if more than 0 record found
if($num>0){
  
    // products array
    $wards_arr=array();
    $wards_arr["records"]=array();
  
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
  
        $ward_item=array(
            "id" => $id,
            "name" => $_name,
            "district_id" => $_district_id,
            "province_id" => $_province_id
        );
  
        array_push($wards_arr["records"], $ward_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show districts data in json format
    echo json_encode($wards_arr);
}
  
else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no districts found
    echo json_encode(
        array("message" => "No districts found.")
    );
}
?>