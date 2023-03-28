const r=require("express").Router();
const nm=require("nodemailer");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
r.use(cookieParser());
r.use(bodyParser.json());
r.use(bodyParser.urlencoded({extended:false}));
const t=nm.createTransport({
	host:'localhost',
	port:'25',
	secure:false,
	tls:{
		rejectUnauthorized:false
	}
});
r.get("/",(req,res)=>{
	res.sendFile(__dirname+"/mailer.html");
});
r.post("/",(req,res)=>{
	if(req.body.from!="" && req.body.to!="" && req.body.subject!="" && req.body.html!=""){
		let obj={
			from:req.body.from,
			to:req.body.to,
			subject:req.body.subject,
			html:req.body.text+" | <br >This message was sent by "
		};
		t.sendMail(obj,(e,d)=>{
			if(e){
				console.log(e);
			}else{
				console.log(d);
				res.redirect("/index");
			}
		});
	}else{
		res.redirect("/index");
	}
});
module.exports=r;
