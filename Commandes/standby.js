const Discord = require ("discord.js");

module.exports.run = async(client,message,args) =>{

	if(standby===false)
	{
		standby=true;
		return message.author.send(`Je resterai en attente dans les salons vocaux`);
	}
	if(standby===true)
	{
		standby=false;
		return message.author.send(`Je quitterai les salons vocaux à la fin de la lecture`);
	}
};

module.exports.help ={
	name: "standby"
};