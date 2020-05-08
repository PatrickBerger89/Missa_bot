const Discord = require ("discord.js");
module.exports.run = async (client,message,args) =>{
	return message.author.send(`Vous avez ${monkeys_list[message.author.id].jeton} jeton(s) pour vous ammuser`);
};

module.exports.help ={
	name: "jeton"
};