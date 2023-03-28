const mysql=require("mysql");
const con=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"123456",
	database:"db0",
});
module.exports=con
