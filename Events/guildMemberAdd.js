//si un event guildMemberAdd arrive (un nouveau membre rejoint le discord)

//chargement de la lib mysql_lite3
var sqlite3 = require('sqlite3').verbose();

//récupération de l'objet db
const sqlite = require("./../class/db.js")

module.exports = async(member)=>{

	//ouverture de la base de donnée
	console.log(await sqlite.open('./db/db_bot.sql3'));

	//on parcours les membres que nous retourne l'api discord
	var users = member.users.cache;
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
	}

	sqlite.close();

};