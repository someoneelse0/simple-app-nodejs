const r=require("express").Router();
const crypto=require("crypto-js");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const bd=require("./bd");
r.use(bodyParser.json());
r.use(bodyParser.urlencoded({extended:false}));
r.use(cookieParser());
r.get("/",(req,res)=>{
	res.sendFile(__dirname+"/login.html");
});
let d="";
r.post("/",(req,res)=>{
	bd.query("SELECT * FROM users;",(e,f,r)=>{
		if(e)throw e;
		for(i=0;i<f.length;i++){
			d=crypto.AES.decrypt(f[i].passkey,"t0u1v2w3x4y5z6").toString(crypto.enc.Utf8);
			if(req.body.key==d){
				res.cookie(req.body.username,"done",{sameSite:"Strict",secure:true}).redirect("/index");
				break;
			}
		}
	});
});
module.exports=r;
