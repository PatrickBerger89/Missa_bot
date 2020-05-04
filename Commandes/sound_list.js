const Discord = require ("discord.js");
//lancement de la lib de lecture distante
const fs=require('fs');

module.exports.run = async (client,message,args) =>{

	
	//chargement des fichiers commandes js
	let list_sound_texte="En utilisant la commande +rh [x] ou x correspond au numéro d'un des sons, Missa vous jouera votre extrait\n\n";

	count=0;
	let rep_mp3 = fs.readdirSync("./mp3/");
	rep_mp3.forEach((rep)=>{
		list_sound_texte=list_sound_texte+"\n**__"+rep+"__**\n";
		
		let list_mp3=fs.readdirSync("./mp3/"+rep+"/");
		
		list_mp3.forEach((sound)=>{
			text_sound=sound.replace('.mp3', '');
			text_sound=text_sound.split('-').join(' ');
			text_sound=text_sound.split('_').join(' ');
			list_sound_texte=list_sound_texte+"> "+count+"     "+text_sound+"\n";
			

			sound_list[count]="./mp3/"+rep+"/"+sound;
			count++;
		})

		console.log(list_mp3);
	})
	message.author.send(list_sound_texte);
};

module.exports.help ={
	name: "sound_list"
};