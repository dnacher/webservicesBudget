var mysql = require('mysql');
var db = require("../core/db");
var settings = require("../settings/settings");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");



exports.getList = function (req, resp,sql){
	var con = mysql.createConnection(settings.dbConfig);
	con.connect(function(err) {
	  	if (err) throw err;
	  	con.query(sql, function (err, data) {	  		  		
	    	if (err){
	    		httpMsgs.show500(req,resp,err,"HTML");
	    	}else{
	    		httpMsgs.show200(req,resp,data,"json");
	    	}	   	 	
	  	});
	
	});
};

exports.get = function (req, resp,sql,id){
	var con = mysql.createConnection(settings.dbConfig);
	con.connect(function(err) {
	  	if (err) throw err;
	  	con.query(sql + id, function (err, data) {	  		  		
	    	if (err){
	    		httpMsgs.show500(req,resp,err,"HTML");
	    	}else{
	    		httpMsgs.show200(req,resp,data,"json");
	    	}	   	 	
	  	});
	
	});
};

exports.add = function (req, resp, user){
	try{
		var con = mysql.createConnection(settings.dbConfig);
		if(!user) throw new Error("Input not valid");
		var data = JSON.parse(user);
		if(data){
			var sql = "INSERT INTO user(iduser, name) VALUES";
			sql+= util.format("(%d, '%s')", data.iduser, data.name);
			con.connect(function(err) {
	  			if (err) throw err;
	  			con.query(sql, function (err, data) {	  		  		
		    		if (err){
		    			httpMsgs.show500(req,resp,err,"HTML");
		    		}else{
		    			httpMsgs.show200(req,resp,data,"json");
		    		}	   	 	
	  			});
			});
		
		}
	}catch(ex){

	}
};

exports.update = function (req, resp, user){
		try{
			var con = mysql.createConnection(settings.dbConfig);
			if(!user)throw new Error("Input not valid");
			var data = JSON.parse(user);
			if(data){
				if(!data.iduser) throw new Error("user id not provided");
				var sql = "UPDATE user SET ";

				//this is thinking about more attributes
				var isDATAProvided = false;
				if(data.name){
					sql+= "name = '" + data.name + "',";
					isDATAProvided = true;
				}
				sql = sql.slice(0, -1); //remove last comma
				sql+= " WHERE iduser = " + data.iduser;
				console.log(sql);
				con.connect(function(err) {
	  			if (err) throw err;
	  			con.query(sql, function (err, data) {	  		  		
		    		if (err){
		    			httpMsgs.show500(req,resp,err,"HTML");
		    		}else{
		    			httpMsgs.show200(req,resp,data,"json");
		    		}	   	 	
	  			});
			});
			}
		
		}catch(ex){
			console.log(ex);
			httpMsgs.show500(req,resp,err,"HTML");
		}
};

exports.delete = function (req, resp, user){
	try{
			var con = mysql.createConnection(settings.dbConfig);
			if(!user)throw new Error("Input not valid");
			var data = JSON.parse(user);
			if(data){
				if(!data.iduser) throw new Error("user id not provided");
				var sql = "DELETE FROM user ";
				sql+= "WHERE iduser = " + data.iduser;
				con.connect(function(err) {
	  			if (err) throw err;
	  			con.query(sql, function (err, data) {	  		  		
		    		if (err){
		    			httpMsgs.show500(req,resp,err,"HTML");
		    		}else{
		    			httpMsgs.show200(req,resp,data,"json");
		    		}	   	 	
	  			});
			});
			}
		
		}catch(ex){
			console.log(ex);
			httpMsgs.show500(req,resp,err,"HTML");
		}
};