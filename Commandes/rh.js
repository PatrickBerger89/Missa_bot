const Discord = require ("discord.js");

//chargement de la lib mysql_lite3
var sqlite3 = require('sqlite3').verbose();

//récupération de l'objet db
const sqlite = require("./../class/db.js")

//récupération de l'objet monkey
const monkeys = require("./../class/monkey.js")


module.exports.run = async (client,message,args) =>{

	console.log(message.content)
	
	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel)
		return message.channel.send(
			"Vous devez être dans un salon vocal pour pouvoir joueur de la musique!"
			);
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
		return message.channel.send(
			"Je n'ai pas le droit de diffuser de la musique dans ce salon"
			);
	}

	if(isNaN(args[0]))
	{
		return message.author.send("Vous n'avez spécifiez un nombre réelle");
	}
	console.log();

	if(monkeys_list[message.author.id].jeton>0)
	{
		monkeys_list[message.author.id].jeton--;

		//on retire au membre un jeton de droit à la connerie

		//on prépare l'objet monkeys
		let monkey= new monkeys();

		//on recherche un correspondance avec un utilisateur existant
		let info = await monkey.search_m(message.author.id).then()
		//si le membre n'existe pas, on le créé immédiatement
		if( info === null)
		{
			result = await monkey.create_m(message.author).then()
			console.log(`création du membre ${message.author['username']}`)
		}
		//creation du tableau de mise à jour
		let new_data={};
		new_data.jeton=monkeys_list[message.author.id].jeton--;
		new_data.time = Date.now();
		new_data.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

		//mise à jour des donnée du membres
		info = await monkey.update_m(new_data).then()

		monkeys_list[message.author.id]=monkey;

		voiceChannel.join()
		.then(connection => {
			const dispatcher = connection.play(sound_list[args], { volume: 0.5 }); 
			dispatcher.on('finish', () => {
				if(standby===false)
				{
					voiceChannel.leave()
				}
			});
		})
		.catch(console.error);
		;
	}
	else
	{
		return message.author.send("Vous avez épuisez vos 5 jetons pour déconner. Les jetons se régénérent toute les minutes, 1 par minutes.");
	}

};

module.exports.help ={
	name: "rh"
};