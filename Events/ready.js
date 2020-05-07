//lancement de la lib de lecture distante
const fs=require('fs');

//chargement de la lib mysql_lite3
var sqlite3 = require('sqlite3').verbose();

//récupération de l'objet db
//let dbo = require('./../class/dbo.js');

const sqlite = require("./../class/db.js")


//si un event on ready arrive arrive (le boot a démarré et s'est connecté avec succés)
module.exports =async(client) =>{
	client.user.setPresence({activity:{name:"Ré écriture compléte du core du robot"}});

	//on charge les données salons stocké sur fichier
	let rawdata = fs.readFileSync('./db/salons.json');
	console.log(rawdata.length)
	if(rawdata.length>0)
	{
		salon = JSON.parse(rawdata);
	}

	//on parcours les salons que nous retourne l'api discord
	var channels = client.channels.cache;
	for(let channel of channels.values())
	{
		console.log(await sqlite.open('./db/db_bot.sql3'));

		sql = "SELECT * FROM salons WHERE id=?"
		r = await sqlite.all(sql, channel["id"])
		r.forEach(function(row) {
			console.log("Read:", row.id, row.name, row.type)    
		})

		console.log("One by one:")

		sqlite.close();

		//si le salon n'est pas une catégorie
		if(channel["type"]!=="category")
		{
			//on prépare le tableau et on le mets à jour au passage
			salon[channel["id"]]={};
			salon[channel["id"]].id=channel["id"];
			salon[channel["id"]].type=channel["type"];
			salon[channel["id"]].name=channel["name"];
		}
	}
	//transformation en json stockable
	let data_salons = JSON.stringify(salon,null, 2);
	//ecriture du fichier JSON
	fs.writeFileSync('./db/salons.json', data_salons);


	//on charge les données membres stocké sur fichier
	let rawdata2 = fs.readFileSync('./db/members.json');
	console.log(rawdata2.length)
	if(rawdata2.length>0)
	{
		member_id = JSON.parse(rawdata2);
	}
	
	//on parcours les membres que nous retourne l'api discord
	var users = client.users.cache;
	for(let usr of users.values())
	{
		//si le joueur n'existe pas on le crée
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
	//transformation en json stockable
	let data_members = JSON.stringify(member_id,null, 2);
	//ecriture du fichier JSON
	fs.writeFileSync('./db/members.json', data_members);



	console.log('Ready to fight');
};