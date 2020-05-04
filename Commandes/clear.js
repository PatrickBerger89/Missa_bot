const Discord = require ("discord.js");

module.exports.run = async(client,message,args) =>{
	console.log('clear demandé');

	console.log(args);
	if (!message.member.hasPermission("MANAGE_MESSAGES"))
	{
		return message.author.send("Vous n'avez pas la permisssion");
	}

	if(!args[0])
	{
		return message.author.send("Vous n'avez spécifiez le nombre de messages à supprimer");
	}
	if(isNaN(args[0]))
	{
		return message.author.send("Vous n'avez spécifiez un nombre réelle");
	}

	message.channel.bulkDelete(args[0])

};
module.exports.help ={
		name: "clear"
	};