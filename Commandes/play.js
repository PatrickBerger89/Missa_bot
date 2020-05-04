const Discord = require ("discord.js");
global.ytdl = require('ytdl-core');
module.exports.run = async (message, serverQueue) =>{
	const args = message.content.split(" ");
	

	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel)
		return message.channel.send(
			"Vous devez être dans un salon vocal pour pouvoir joueur de la musique!"
			);
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
		return message.channel.send(
			"Je n'ai pas le droit de diffuser de la musique dans ce salon"
			);
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 0.7,
			playing: true
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		return message.channel.send(`${song.title} a été rajouté à la file d'attente!`);
	}
	function play(guild, song) {
		const serverQueue = queue.get(guild.id);
		if (!song) {

			if(standby===false)
			{
				serverQueue.voiceChannel.leave();
			}

			
			
			queue.delete(guild.id);
			return;
		}

		const dispatcher = serverQueue.connection
		.play(ytdl(song.url))
		.on("finish", () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on("error", error => console.error(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 2);
		serverQueue.textChannel.send(`Lecture de : **${song.title}**`);
	}
};

module.exports.help ={
	name: "play"
};