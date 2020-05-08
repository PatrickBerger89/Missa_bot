//lancement de la lib de lecture distante
const fs=require('fs');

//chargement de la lib mysql_lite3
var sqlite3 = require('sqlite3').verbose();

//récupération de l'objet db
const sqlite = require("./../class/db.js")


//si un event on ready arrive arrive (le boot a démarré et s'est connecté avec succés)
module.exports =async(client) =>{
	client.user.setPresence({activity:{name:"Ré écriture compléte du core du robot"}});

	//ouverture
	console.log(await sqlite.open('./db/db_bot.sql3'));

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
		
		//on recherche ce salon dans la base de donnée
		sql = "SELECT * FROM salons WHERE id=?"
		r = await sqlite.all(sql, channel["id"])

		console.log(r.length)

		//si dans la réponse il y a des élément, on fait une mise à jours de principe
		if(r.length>0)
		{
			var sql = "UPDATE salons set id ='"+channel['id']+"', name ='"+channel['name']+"', type ='"+channel['type']+"' WHERE id ='"+channel['id']+"'"
			
			console.log(sql)
			r = await sqlite.run(sql)
			console.log(r)
			if(r) console.log("Mis à jours.")
		}
		//sinon on crée le salons dans la base de données
		else
		{
			var entry = `'${channel["id"]}','${channel["name"]}','${channel["type"]}'`
			var sql2 = "INSERT INTO salons (id, name, type) VALUES (" + entry + ")"
			r = await sqlite.run(sql2)
			if(r) console.log("Insertions")
		}

		//console.log("One by one:")

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
		//on recherche ce membre dans la base de donnée
		sql = "SELECT * FROM members WHERE id=?"
		r = await sqlite.all(sql, usr['id'])

		console.log(r.length)
		console.log(r)

		//si la réponse est vide, le membre
		if(r.length==0)
		{
			var entry = `'${usr['id']}','${usr.username}','${Date.now()}','out','inc','inc','0','5'`
			var sql2 = "INSERT INTO members (id, name, time, salon, game , type , alert ,jeton ) VALUES (" + entry + ")"
			console.log(sql2)
			r = await sqlite.run(sql2)
			if(r) console.log("Insertions")
		}
		

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
	sqlite.close();
};