var usr = require("../controllers/users");

exports.show500 = function (req, resp, err,httMsgsFormat){
	if(httMsgsFormat === "HTML"){
		resp.writeHead(500, "Internal Error Ocurred", {"Content-Type": "text/html"});
	    resp.write("<html><head>500</head><body>500: Interna Error. details:" + err + "</body></html>");
	}else{
		resp.writeHead(500, "Internal Error Ocurred", {"Content-Type": "application/json"});
	   	resp.write(JSON.stringify({data : "Internal Error Ocurred"}));
	}
	resp.end();
};

exports.show200 = function(req,resp,data,httMsgsFormat){
	if(httMsgsFormat === "HTML"){
		resp.writeHead(200, {"Content-Type": "text/html"});
	    resp.write("<html><head>200</head><body>200: data:" + data + "</body></html>");
	}else{
		resp.writeHead(200, {"Content-Type":"application/json"});
	    resp.write(JSON.stringify(data));
	}
	resp.end();
};

exports.show405 = function(req,resp,httMsgsFormat){
	if(httMsgsFormat === "HTML"){
		resp.writeHead(405,"Method not supported", {"Content-Type": "text/html"});
	    resp.write("<html><head>405</head><body>405: Method not supported:" + err + "</body></html>");
	}else{
		resp.writeHead(405,"Method not supported", {"Content-Type":"application/json"});
	    resp.write(JSON.stringify({data : "Method not supported"}));
	}
	resp.end();
};

exports.show404 = function(req,resp,httMsgsFormat){
	if(httMsgsFormat === "HTML"){
		resp.writeHead(404,"Resource not found", {"Content-Type": "text/html"});
	    resp.write("<html><head>404</head><body>404: Resource not found:" + err + "</body></html>");
	}else{
		resp.writeHead(404,"Resource not found", {"Content-Type":"application/json"});
	    resp.write(JSON.stringify({data : "Resource not found"}));
	}
	resp.end();
};

exports.needID = function(req,resp,httMsgsFormat){
	if(httMsgsFormat === "HTML"){
		resp.writeHead(404,"Resource not found", {"Content-Type": "text/html"});
	    resp.write("<html><head>id needed</head><body>please add to the url a / followed by the id of the user like this: /users/1 </body></html>");
	}else{
		resp.writeHead(404,"Resource not found", {"Content-Type":"application/json"});
	    resp.write(JSON.stringify({data : "Resource not found"}));
	}
	resp.end();
};


exports.showHomePage = function(req,resp,httMsgsFormat){
	if(httMsgsFormat === "HTML"){
		resp.writeHead(200, {"Content-Type": "text/html"});
	    resp.write("<html>");
	    resp.write("<head>");
	    resp.write("<script>");
	    resp.write("function myFunction() {");
	    resp.write("method = 'get';");
	    resp.write("iduser= document.getElementById('iduser').value;");
	    resp.write("path= '/user/';");
	    resp.write("pathway= path.concat(iduser);");
		resp.write("var form = document.createElement('form');");
		resp.write("form.setAttribute('method', method);");
    	resp.write("form.setAttribute('action', pathway);");
    	resp.write("document.body.appendChild(form);");
    	resp.write("form.submit();");
	    resp.write("}");
	    resp.write("</script>");
	    resp.write("<title>Home Page</title>");
	    resp.write("</head>");
	    resp.write("<body>");	   
	    resp.write("<a href='http://localhost:9000/users'>get all Users</a><br>");
	   // resp.write("<form action='/user/'+ iduser  method='get'>");
	    resp.write("<h3>get User</h3><br>");
	    resp.write("Id: ");
	    resp.write("<input type='text' id='iduser'><br><br>");
	    resp.write("<button onclick='myFunction();'>get user</button>");
	    //resp.write("</form>");
	    resp.write("</body>");
	    resp.write("</html>");
	}else{
		resp.writeHead(200, {"Content-Type":"application/json"});
	    resp.write(JSON.stringify({data : "Resource not found"}));
	}
	resp.end();
};

function getuser() {
	var iduser = $("#iduser").val();	

	var params = {
		iduser: iduser
	};
	console.log(idUser);
	$.post(usr.get(req,resp,"SELECT * FROM user WHERE iduser=",idUser));
}


