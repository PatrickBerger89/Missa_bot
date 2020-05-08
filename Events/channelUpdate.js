//si un event guildMemberAdd arrive (un nouveau membre rejoint le discord)

//chargement de la lib mysql_lite3
var sqlite3 = require('sqlite3').verbose();

//récupération de l'objet db
const sqlite = require("./../class/db.js")

//récupération de l'objet monkey
const salons_m = require("./../class/salon.js")

module.exports = async(oldChannel, newChannel)=>{

	//on prépare l'objet salon_m
	let salon= new salons_m();

	//on recherche un correspondance avec un salon existant
	let info = await salon.search_s(newChannel.id).then()
	//si le salon n'exsite pas on le créé
	if( info === null){result = await salon.create_s(newChannel).then();}
	//sinon on le met à jours de toute façon
	else{result = await salon.update_s(newChannel).then();}

	salon_list[newChannel.id]=salon;

};