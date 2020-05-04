const Discord = require ("discord.js");
module.exports.run = async (client,message, args) =>{
	message.author.send({
		embed:{
			color: 3447003,
			title:`**Informations sur les prisons**`,
			fields: [
			{
				name:"Durée par crimestat",
				value : "40 minutes par crimestat"
			},
			{
				name:"Diminution de la peine de prison en minant de Dolivine",
				value : "1 minute / pierre vendue"
			},
			
			{
				name:"Diminution de la peine de prison en minant de l'aphorite",
				value : "6 minute / pierre vendue (estimation)"
			},
			{
				name:"Diminution de la peine de prison en minant de l'Hadanite",
				value : "20 minute / pierre vendue (estimation)"
			}
			,
			{
				name:"Arme dispo",
				value : "Aucune, combats à mains nues possible hors de la zone de vie"
			}
			,
			{
				name:"Outils",
				value : "MultiTools fourni avec sa tête de minage, fonctionnel hors de la zone de vie"
			}
			,
			{
				name:"Oxygène",
				value : "limité à une trentaine de minutes"
			}
			,
			{
				name:"Conseil avant arrestation",
				value : "Tous l'équipement que vous porterez sera perdu, pensez à vous déséquiper si vous pouvez."
			}
			,
			],
			footer: {
				text:`informations demandées par  l'utilisateur ${message.author.username}`
			}
		}
	})

};

module.exports.help ={
	name: "prison"
};