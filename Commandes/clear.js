const Discord = require ("discord.js");

//si la commande clear est appelé
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
	//destruction de x message
	message.channel.bulkDelete(args[0])

};
module.exports.help ={
		name: "clear"
	};