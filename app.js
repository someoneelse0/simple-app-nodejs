const express=require("express");
const app=express();
const http=require("http").Server(app);
const io=require("socket.io")(http);
const cors=require("cors");
const multer=require("multer");
const s=multer.diskStorage({
	destination:"files/",
	filename:function(req,file,cb){
		cb("",file.originalname);
	}
});
const up=multer({
	storage:s
});
const login=require("./login.js");
const index=require("./index.js");
const signup=require("./signup.js");
const mailer=require("./mailer.js");
const config=require("./config.js");
const m=require("./m.js");
const logout=require("./logout.js");
const delaccper=require("./delaccper.js");
app.use(express.static("public"));
app.use(cors());
app.use("/login",login);
app.use("/index",index);
app.use("/signup",signup);
app.use("/mailer",mailer);
app.use("/config",config);
app.use("/config",m);
app.use("/config",logout);
app.use("/config",delaccper);
app.get("/chat",(req,res)=>{
	res.sendFile(__dirname+"/chat.html");
});
let userzero="";
let userone="";
let d="";
let dd="";
let aa="";
io.on("connection",(s)=>{
	console.log(s.id,"is now connected");
	s.on("f",(d)=>{
		userzero!=""?userone=d.ck.split("=")[0]:userzero=d.ck.split("=")[0];
		if(userzero==userone){
			d="<p class='one'>"+userzero+": "+d.m+"</p>";
			io.sockets.emit("f",d);
		}else{
			d="<p class='two'>"+userone+": "+d.m+"</p>";
			io.sockets.emit("f",d);
		}
	});
	s.on("ff",(d)=>{
		aa=d.file.split("\\")[2];
		userzero!=""?userone=d.ck.split("=")[0]:userzero=d.ck.split("=")[0];
		if(userzero==userone){
			dd="<li class='one'>"+userzero+"\'s file: "+`<a href=download/${aa}>`+aa+"</a></li>";
			io.sockets.emit("ff",dd);
		}else{
			dd="<li class='two'>"+userone+"\'s file: "+`<a href=download/${aa}>`+aa+"</a></li>";
			io.sockets.emit("ff",dd);
		}
	});
	s.on("disconnect",()=>{
		console.log(s.id,"has been gone");
	});
});
app.post("/upload",up.single("ifile"),(req,res)=>{
	res.send("OK");
});
app.get("/download/:id",(req,res)=>{
	res.download(__dirname+"/files/"+req.params.id,req.params.id,function(e){if(e){console.log(e);}});
});
http.listen(3000,()=>{
	console.log("Server on port 3000");
});
