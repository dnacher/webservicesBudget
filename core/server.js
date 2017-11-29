var http = require("http");
var usr = require("../controllers/users");
var settings = require("../settings/settings");
var httpMsgs = require("./httpMsgs");

http.createServer(function (req, resp){
	switch(req.method){
		case "GET":
			if(req.url === "/"){
				httpMsgs.showHomePage(req,resp,"HTML");
				break;					
			}else if(req.url === "/users"){
				usr.getList(req, resp,"SELECT * FROM user");			
			}else{
				var iduserPatt = "[0-9]+";				
				var patt = new RegExp("/user/" + iduserPatt);
				if(patt.test(req.url)){
					patt = new RegExp(iduserPatt);
					var idUser = patt.exec(req.url);
					usr.get(req,resp,"SELECT * FROM user WHERE iduser=",idUser);
				}else{
					httpMsgs.needID(req,resp,"HTTP");
				}
			}
			break;
		case "POST":
			if(req.url === "/users"){
				var reqBody = '';
				req.on("data", function(data){
					reqBody += data;
				});	
				req.on("end", function(){
					usr.add(req, resp, reqBody);
				});
			}else{
				httpMsgs.show404(req,resp,"HTTP");				
			}
			break;	
		case "PUT":
			if(req.url === "/users"){
				var reqBody = '';
				req.on("data", function(data){
					reqBody += data;
				});	
				req.on("end", function(){
					usr.update(req, resp, reqBody);
				});
			}else{
				httpMsgs.show404(req,resp,"HTTP");				
			}
			break;	
		case "DELETE":
			if(req.url === "/users"){
				var reqBody = '';
				req.on("data", function(data){
					reqBody += data;
				});	
				req.on("end", function(){
					usr.delete(req, resp, reqBody);
				});
			}else{
				httpMsgs.show404(req,resp,"HTTP");				
			}
			break;		
		default:
			httpMsgs.show405(req,resp,"HTTP");
			break;		
	}
}).listen(settings.webPort, function(){
	console.log("Started listening at: " + settings.webPort);
});