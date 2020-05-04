var googleTTS = require('google-tts-api');

//si la commande says est utilisé
module.exports.run = async (client,message,args) =>{
	//on supprime +says pour qu'il ne soit pas dit
	text=message.content.replace('+says ', '');
	
	//on utilise l'api google translate qui nous retournera un lien type MP3
	googleTTS(text, 'fr', 1)   
	.then(function (url) {

		console.log(url); 

		let voiceChannel = message.member.voice.channel;
		//on se connecte au channel
		voiceChannel.join().then(connection => {
			//li le fichier retourné
			const dispatcher = connection.play(url, { volume: 1 }); 
			//on se déconnecte
			dispatcher.on('finish', () => {voiceChannel.leave()});
		})


	})
	.catch(function (err) {
		console.error(err.stack);
	});
};

module.exports.help ={
	name: "says"
};