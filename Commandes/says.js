var googleTTS = require('google-tts-api');

module.exports.run = async (client,message,args) =>{

	text=message.content.replace('+says ', '');
	googleTTS(text, 'fr', 1)   
	.then(function (url) {

		console.log(url); 
		//let voiceChannel = client.channels.cache.get("705683831247601665");
		let voiceChannel = message.member.voice.channel;
		voiceChannel.join().then(connection => {
			const dispatcher = connection.play(url, { volume: 1 }); 
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