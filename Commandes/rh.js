const Discord = require ("discord.js");
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

	if(salon_kill[message.author.id].jeton>0)
	{
		salon_kill[message.author.id].jeton--;

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