const Discord = require ("discord.js");
//si la commande kick arrive
module.exports.run = async(client,message,args) =>{

	console.log('kick demandé');

	console.log(args);
	if (!message.member.hasPermission("KICK_MEMBERS"))
	{
		return message.channel.send("Vous n'avez pas la permisssion");
	}
	
	var member= message.mentions.members.first();

	if(message.mentions.users.size===0) 
	{
		return message.channel.send("Vous devez mentionner un utulisateur");
	}

	let kick = message.guild.member(message.mentions.users.first());

	if(!kick)
	{
		return message.channel.send("Je n'ai pas trouvé l'utilisateur");
	}
	raison = message.content.replace('+kick', '');
	raison = raison.replace(message.mentions.users.first(), '');
	kick.voice.setChannel(null)

	message.channel.send(`${member.user.username} est kick par ${message.author.username}, pour la raison suivante ${raison}`);
	message.mentions.users.first().send(`${member.user.username}, Vous avez été expulsé du serveur **${message.guild.name} par ${message.author.username}, pour la raison suivante '${raison}'`);
	};

	module.exports.help ={
		name: "kick"
	};