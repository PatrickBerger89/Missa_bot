const Discord = require ("discord.js");

module.exports.run = async(client,message,args) =>{

	console.log('kill demandé');

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

	let kill = message.guild.member(message.mentions.users.first());

	if(!kill)
	{
		return message.channel.send("Je n'ai pas trouvé l'utilisateur");
	}
	
	raison = message.content.replace('+kill', '');
	raison = raison.replace(message.mentions.users.first(), '');

	//const m = await message.channel.send('Bonne nuit '+message.member.displayName);
	kill.voice.setChannel('597787997936549899')

	message.channel.send(`${member.user.username} est kick par ${message.author.username}, pour la raison suivante ${raison}`);
		 message.mentions.users.first().send(`${member.user.username}, Vous avez été expulsé du serveur **${message.guild.name} par ${message.author.username}, pour la raison suivante '${raison}'`);
	};

	module.exports.help ={
		name: "kill"
	};