var mysql = require('mysql');
var settings = require("../settings/settings");

var con = mysql.createConnection(settings.dbConfig);

exports.executeSQL = function (sql, callback){

	con.connect(function(err) {
	  	if (err) throw err;
	  	con.query(sql, function (err, data) {	  		  		
	    	if (err){
	    		resp.writeHead(500, "Internal Error Ocurred", {"Content-Type": "text/html"});
	    		resp.write("<html><head>500</head><body>500: Interna Error. details:" + err + "</body></html>")
	    	}else{
	    		resp.writeHead(200, {"Content-Type":"application/json"});
	    		resp.write(JSON.stringify(data));
	    	}
	   	 	console.log(data);
	   	 	resp.end();
	  	});
	});

};

