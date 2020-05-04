const Discord = require ("discord.js");

module.exports.run = async(client,message,args) =>{

let test=new Array();
var valueToPush = new Array();
valueToPush["id"] = 200;
test['aaa']=valueToPush;
console.log(typeof  (user_id));
if(typeof (user_id) !== "undefined")
	{
		console.log(user_id);
	}
	else{
		console.log("user_id n'exsite pas");
	}


console.log(typeof (test["aaa"]));
if(typeof (test["aaa"]) !== "undefined")
	{
		console.log(test["aaa"]);
	}
	else{
		console.log("test['aaa'] n'exsite pas");
	}
console.log(typeof (test["aaa"]['id']));
if(typeof (test["aaa"]) !== "undefined")
	{
		console.log(test["aaa"]['id']);
	}
	else{
		console.log("test['aaa']['id'] n'exsite pas");
	}

	console.log(typeof (test["aaa"]['game']));
if(typeof (test["aaa"]['game']) !== "undefined")
	{
		console.log(test["aaa"]['game']);
	}
	else{
		console.log("test['aaa']['game'] n'exsite pas");
	}
//obj.hasOwnProperty("key") // true

//console.log(test["aaa"].hasOwnProperty('game'));
/*
if(typeof (member_id["aaa"]) === undefined)
	{
		console.log(member_id["aaa"]['game']);
	}
	else{
		console.log("member_id['aaa']['game'] n'exsite pas");
	}
*/


};





module.exports.help ={
	name: "crash"
};