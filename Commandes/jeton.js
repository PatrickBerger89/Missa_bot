const Discord = require ("discord.js");
module.exports.run = async (client,message,args) =>{
	return message.author.send(`Vous avez ${member_id2[message.author.id].jeton} jeton(s) pour vous ammuser`);
};

module.exports.help ={
	name: "jeton"
};