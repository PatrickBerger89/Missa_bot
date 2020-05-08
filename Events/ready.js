//lancement de la lib de lecture distante
const fs=require('fs');

//chargement de la lib mysql_lite3
var sqlite3 = require('sqlite3').verbose();

//récupération de l'objet db
const sqlite = require("./../class/db.js")

//récupération de l'objet monkey
const monkeys = require("./../class/monkey.js")

//récupération de l'objet monkey
const salons_m = require("./../class/salon.js")


//si un event on ready arrive arrive (le boot a démarré et s'est connecté avec succés)
module.exports =async(client) =>{
	client.user.setPresence({activity:{name:"Ré écriture compléte du core du robot"}});

	let  channels = client.channels.cache;

	for(let channel of channels.values())
	{
		//on prépare l'objet monkeys
		let salon= new salons_m();
		
		//on recherche un correspondance avec un salon existant
		let info = await salon.search_s(channel["id"]).then()
		//si le salon n'exsite pas on le créé
		if( info === null){result = await salon.create_s(channel).then();}
		//sinon on le met à jours de toute façon
		else{result = await salon.update_s(channel).then();}

		salon_list[channel["id"]]=salon;

		//console.log(salon_list[channel["id"]]);
	}
	//console.log(salon_list);
	
	let  users = client.users.cache;
	for(let usr of users.values())
	{

		//on prépare l'objet monkeys
		let monkey= new monkeys();
		
		//on recherche un correspondance avec un utilisateur existant
		let info = await monkey.search_m(usr['id']).then()
		if( info === null)
		{
			result = await monkey.create_m(usr).then()
			console.log(`création du membre ${usr['username']}`)
		}
		monkeys_list[usr.id]=monkey;
	}

	console.log('Ready to fight');
	//sqlite.close();
};