//si un event guildMemberAdd arrive (un nouveau membre rejoint le discord)

//chargement de la lib mysql_lite3
var sqlite3 = require('sqlite3').verbose();

//récupération de l'objet db
const sqlite = require("./../class/db.js")

module.exports = async(member)=>{

	//on parcours les membres que nous retourne l'api discord
	var users = member.users.cache;
	for(let usr of users.values())
	{

		//on prépare l'objet monkeys
		let monkey= new monkeys();
		
		//on recherche un correspondance avec un utilisateur existant
		info = await monkey.search_m(usr['id']).then()
		if( info === null)
		{
			result = await monkey.create_m(usr).then();
			monkeys_list[usr.id]=monkey;
			console.log(result);
		}
		else
		{
			console.log(info)
		}
	}
};