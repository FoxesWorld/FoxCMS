<?php
/*FoxesModule%>
{
	"version": "V 1.0.0 Alpha",
	"description": "SQL query requests requests",
	"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABO1BMVEX///+41DH/Vlsidcgld8f/WV7snh4AcsaQyP8Af/8IdcfsnRvC2fAAcMW11e4qe8n/7/D9+/f/b3P6n6P+/fsYd8j469PspC38/f7z9/zvnhx2h4Lvs1Eyhc3n8PlTktLuqjvwu2K51TTg6/fsnBrg7Ko9j9K00i2SwySMwA3soiezz+u50uwoeMj+ZGn779zV5fTu9tv1+eh9uQD216T35MJjoNiTyf/o8cFOmdWgxOZyp9uSveRDiM78kZX819f++fHyxnuHtuH8s7bK3vL84OIWb738xsj7eH2910HB2lx8uQCuzer8rK/dW2mbjl1/rt4AgP9Rqf/K32miyh+71u6ey0TxzI5WaaP0WmGjYYJXgprwzpN5ZZSeY4XIXnMvbbPsnBjQ4nvW6bXB3Yyw1Gvbg5LN09HrnRtyPf6RAAAEGUlEQVRYw8WXeXuiSBCHWwVMUBJbQWFW8CCi8UjUqPGMxiMZjWacyTX37M6xO9//E0w3ECOCivrH/h4fbZR6qeqqLrvB2/2d9Bbsvzvf21rn7/bB/jnYQecIsLfkN1gsVKsJrGq1UITWN+0tAcBC4vtoOIw7HHFHHL2Gw9H3RAHaBcDq3dBhUnJ4V2XtARJxh7XiifUAHgD2LolvjquYZDLpmF0l71j1jlUAWQKgOsJ29/ep42el7u8xaVQFQJJXAw4qiFBMjFLHZzdnM93cnB2nRokism941wBoZSzgNPz4+evxMaXp8fHXzx84CUI2klsLYGil2RfwmIXFYqFQKBahOvtCvh45dB2uBbjdDMMpjeZDXhIEHksQpLy3Po2IhIsg7ADcmMHQ3KGo1GqVSiUSaYk5woWsCdsAXYjDubCImTYDIMSc7VYAN6ea5bYHuJBx7n/2gNjCA5REmmbUgesw59p8EpWmt3/QQPZi96H/0G0hJ7rZqW0Ao8hAkAVU1TUZ8Kiq8xFXLguy9j2oA1nhxJpblEG/0mqgd5HIgswmAElBRch00SdHuBo839gIwNQkIDVFN50FXhqlsSWB5mYeuGt9HkgV2gsOcB20ZFDfDICWUCUPZHEM8hwKISKA6WYAkWOYKRCUCs93CQJxpNZGALre73bz6On0GPDecR7wUwKlUcpkMg17HjRR7gVvDS2Epoy6uNxA62ksIPF1ewAadSKFw6XsFiMZXEdoJiNYLdtrgWH0hsKJGSBX0HLSO9MWHUls1rviTv1gviVu1w/mW4ItwNX7qxcPXEat+2d6UAG3397rk+j+9JdRn/5jVwIkkcEA54ePf2uAN68MoqhQrNRZtcHwihhAkuTtlysNQC3IQ8WCywDs4Drw79evHz+QWGocZgBFHUXL1oD2xQnpRCJ14TisAIgQtADAycnM9Fm3X96EDEr/9qiEWMcEgAHSQhftoEHlz1GVQJVMgIluMh/D62vz3jAY9qgusAuA9olmfvIaSR9OfBabULacxh5EiwuAgPbYQNsH4cCPzMmLgfX2tqMGEQoaAT6/Zs9qF04L709L2jcwbAVoq077fTrN7H2nFA1rgNMQrqboqRFwrQIutJt9gYEp8DD1jwZgL7EDHu1iCcC4ncUPvUx7kE0HsCwaqoXwtJBGLQl+n+WslbTch2JI2lCPwDCJahYC0CJtYcrzvI48R0fUXB1ZpPGi7TNK9d6kS2gCDPRCIv1GBWLUIuAo/QQtVmOPnKvlZ5HOHtRnQI0AxfA7HSvzVv2AnZBO82Jy9nAOQioiHUaKfS7DJS2N7fmdTisA4Ms4DpRGCCG/6sgzCPgNAWBNZpnUC2nlmYn3XfcCRrVfaskGwFyEL5d8+ckaYP/oy1offXc9fO96/P8DUmWzEyFPrcQAAAAASUVORK5CYII="
}
<%FoxesModule*/
	$SqlQueryExecuter = new SqlQueryExecuter($this->db);

	class SqlQueryExecuter extends init {
		
		private $requestHeader = "sqlQuery";
		protected $db;
		
		function __construct($db) {
			$this->db = $db;
			$this->queryListener();
		}
		
		private function queryListener() {
			if(isset(RequestHandler::$REQUEST[$this->requestHeader])){
				$request = $this->db->query(RequestHandler::$REQUEST[$this->requestHeader]);
				if($request) {
					functions::jsonAnswer("Changed!!!");
				} else {
					functions::jsonAnswer("Empty query!", true);
				}
				/*
				switch(RequestHandler::$REQUEST[$this->requestHeader]){
					case "UPDATE":
					$query = "";
						die("UPDATE");
					break;

					case "INSERT":
						die('INSERT');
					break;

					case "DELETE":
						die('DELETE');
					break;
				} */
			}
		}
		
	}