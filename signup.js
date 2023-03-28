const r=require("express").Router();
const crypto=require("crypto-js");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const bd=require("./bd");
r.use(bodyParser.json());
r.use(bodyParser.urlencoded({extended:false}));
r.use(cookieParser());
r.get("/",(req,res)=>{
	res.sendFile(__dirname+"/signup.html");
});
let c="";
r.post("/",(req,res)=>{
	if(req.body.username!="" && req.body.key!=""){
		c=crypto.AES.encrypt(req.body.key,"t0u1v2w3x4y5z6").toString();
		bd.query("INSERT INTO users VALUES(?,?);",[req.body.username,c],(e,f,r)=>{
			if(e)throw e;
			res.cookie(req.body.username,"done").redirect("/index");
		});
	}
});
module.exports=r;
