var googleTTS = require('google-tts-api');
module.exports = async(client,oldMember, newMember)=>{

	let last_channel_id="";
	//si l'on détecte un mouvement de sortie de salon
	if(oldMember)
	{
		//on vérifie que le channel id exsite, sinon le joueur vient de faire une connection au serveur
		if(oldMember.channel!==null)
		{
			if(oldMember.member.nickname !== null && member_id[oldMember.id].salon!=="out")
			{
				console.log(oldMember.member.nickname+" est sortie du  salon : "+salon[member_id[oldMember.id].salon].name);
			}

			else
			{
				if (member_id[oldMember.id].salon!== "out")
				{
					console.log(oldMember.member.user.username+" est sortie du  salon : "+salon[member_id[oldMember.id].salon].name);
				}
			}

			//on mémorise d'ou vient de partir le membre
			last_channel_id=oldMember.channel.id;
		}

	}
	//si l'on détecte un mouvement de rentré de salon
	if(newMember)
	{
		//on vérifie que le channel id exsite, sinon le joueur vient de faire une déconnection du serveur
		if(newMember.channel!==null)
		{
			//si l'id de lancien channel et bien différent du nouveau, c'est qu'il s'agit d'un mouvement réelle
			if(last_channel_id !== newMember.channel.id)
			{
				//si le joueur est dans la BD
				if(newMember.id in member_id)
				{
					//on mémorise la nouvelle position du joueur
					member_id[newMember.id].salon=newMember.channel.id;
					member_id[newMember.id].time = Date.now();
					member_id[newMember.id].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');


					//si le joueur avait définis un pseudo
					if(newMember.member.nickname !== null)
					{
						console.log(newMember.member.nickname+" est entré dans le du  salon : "+salon[member_id[newMember.id].salon].name)
					}

					else
					{
						console.log(newMember.member.user.username+" est entré dans le du  salon : "+salon[member_id[newMember.id].salon].name)
					}
				}

				if(salon_auto_play.includes(newMember.channel.id))
				{
					let voiceChannel = client.channels.cache.get(newMember.channel.id);
					voiceChannel.join().then(connection => {
						const dispatcher = connection.play('./mp3/Thème_musicaux/Avenger-style.mp3', { volume: 0.2 }); 
						dispatcher.on('finish', () => {voiceChannel.leave()});
					});
				}
				if(salon_auto_says.includes(newMember.channel.id))
				{
					if(newMember.member.user.username!=="missa")
					{
						text="Bonjour.... Sois le bienvenue"+newMember.member.user.username+"dans ce serveur. Pour connaître mes possibilité utilises la commande   +help";
						googleTTS(text, 'fr', 1)   
						.then(function (url) {

							//console.log(url); 
							let voiceChannel = client.channels.cache.get(newMember.channel.id);
							voiceChannel.join().then(connection => {
								const dispatcher = connection.play(url, { volume: 1 }); 
								dispatcher.on('finish', () => {voiceChannel.leave()});
							})


						})
						.catch(function (err) {
							console.error(err.stack);
						});
					}
					
				}
			}
		}
		else
		{ //si le joueur est dans la BD
			if(newMember.id in member_id)
			{
				//si le joueur avait définis un pseudo
				if(newMember.member.nickname !== null)
				{
					console.log("Le joueur "+newMember.member.nickname+" s'est déconnecté.")
				}

				else
				{
					console.log("Le joueur "+newMember.member.user.username+" s'est déconnecté.")
				}

				//on mémorise la nouvelle position du joueur
				member_id[newMember.id].salon="out";
				member_id[newMember.id].time = Date.now();
				member_id[newMember.id].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			}
		}
	}
};