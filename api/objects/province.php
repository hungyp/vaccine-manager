<?php
class Province{
  
    // database connection and table name
    private $conn;
    private $table_name = "province";
  
    // object properties
    public $id;
    public $name;
    public $district_id;
    public $province_id;
  
    public function __construct($db){
        $this->conn = $db;
    }
  
    
    // used by select drop-down list
    public function read(){
    
        //select all data
        $query = "SELECT
                    id, _name
                FROM
                    " . $this->table_name . "
                ORDER BY
                    _name    
                    ";
    
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
    
        return $stmt;
    }

    function readOne(){
        
        // query to read single record
        $query = "SELECT
                    _name
                FROM
                    " . $this->table_name . " 
                WHERE
                    id = ?
                LIMIT
                    0,1";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind id of product to be updated
        $stmt->bindParam(1, $this->id);

        // execute query
        $stmt->execute();

        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set values to object properties
        $this->name = $row['_name'];
    }
}
?>