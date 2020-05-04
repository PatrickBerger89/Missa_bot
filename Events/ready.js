//lancement de la lib de lecture distante
const fs=require('fs');

module.exports =async(client) =>{
	client.user.setPresence({activity:{name:"Ré écriture compléte du core du robot"}});

	let rawdata = fs.readFileSync('./db/salons.json');
	console.log(rawdata.length)
	if(rawdata.length>0)
	{
		salon = JSON.parse(rawdata);
	}

	var channels = client.channels.cache;
	for(let channel of channels.values())
	{
		if(channel["type"]!=="category")
		{
			salon[channel["id"]]={};
			salon[channel["id"]].id=channel["id"];
			salon[channel["id"]].type=channel["type"];
			salon[channel["id"]].name=channel["name"];
		}
	}
	let data_salons = JSON.stringify(salon,null, 2);
	fs.writeFileSync('./db/salons.json', data_salons);



	let rawdata2 = fs.readFileSync('./db/members.json');
	console.log(rawdata2.length)
	if(rawdata2.length>0)
	{
		member_id = JSON.parse(rawdata2);
	}
	

	var users = client.users.cache;
	for(let usr of users.values())
	{
		//console.log(member_id[usr.id]);
		if(typeof (member_id[usr.id]) === "undefined")
		{
			member_id[usr.id]={};
			member_id[usr.id].id = usr['id'];
			member_id[usr.id].name = usr.username;
			member_id[usr.id].salon = "out";;
			member_id[usr.id].game = "inc";
			member_id[usr.id].type = "inc";
			member_id[usr.id].time = Date.now();
			member_id[usr.id].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			member_id[usr.id].alert = 0;
			member_id[usr.id].jeton = 5;
		}

	}

	let data_members = JSON.stringify(member_id,null, 2);
	fs.writeFileSync('./db/members.json', data_members);



	console.log('Ready to fight');
};