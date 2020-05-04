const Discord = require ("discord.js");
module.exports.run = async (message, serverQueue) =>{
	if (!message.member.voice.channel)
		return message.author.send(
			"Vous devez être dans le vocal pour pouvoir changer de musique!"
			);
	if (!serverQueue)
		return message.author.send("Pas d'autre musique dans la file d'attente!");
	serverQueue.connection.dispatcher.end();
};

module.exports.help ={
	name: "skip"
};