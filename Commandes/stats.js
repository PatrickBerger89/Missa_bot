const Discord = require ("discord.js");
const moment = require ("moment")

module.exports.run = async (client,message, args) =>{
	const membre= message.mentions.members.first() || message.member;
	//if(!membre) return message.channel.send(`Veuillez mentionner un utilisateur !`)
	//console.log(membre);
	//console.log(membre.guild.members);

	//console.log(membre.user.displayAvatarURL())

	message.author.send({
		embed:{
			color: 3447003,
			title:`Statistique de l'utilisateur **${membre.nickname}**`,
			thumbnail:{
				url : membre.user.displayAvatarURL()
			},
			fields: [
			{
				name:">ID : ",
				value : membre.id
			},
			{
				name:"Crée le : ",
				value : moment .utc(membre.user.createdAT).format('LL')
			}
			,
			{
				name:"Jeux : ",
				value : `${membre.user.presence.game? membre.GuildMember.presences.game.name: "Aucun jeu"}`
			}
			,
			{
				name:"Nombre de jetons : ",
				value : `${membre.user.presence.game? membre.GuildMember.presences.game.name: "Aucun jeu"}`
			}
			,
			{
				name:"Rejoins : ",
				value : moment .utc(membre.joinedAT).format('LL')
			}
			],
			footer: {
				text:`information de l'utilisateur ${membre.user.nickname}`
			}
		}
	})

};

module.exports.help ={
	name: "stats"
};