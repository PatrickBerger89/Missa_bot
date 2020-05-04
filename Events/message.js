const config  =  require ( "./../config.json" );
const prefix= config.prefix;

module.exports = async(client,message)=>{

	//refus des commandes venant d'un autre bot
	if(message.author.bot) return;

	//refus des commandes en MP
	//if(message.channel.type ==="dm") return;
	//si le message ne commance pas par +
	if(!message.content.startsWith(prefix)) return;

	const args = message.content.slice (prefix.length).trim().split(/ +/g);
	const commande = args.shift();

	const cmd = client.commands.get(commande);
	console.log(`L'utilisateur ${member_id[message.author.id].name} à fait appel à la commande : ${commande} , arguments ${args} à ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`)
	//console.log("arguements : "+args);
	//console.log("Commande : "+commande);
	//console.log(cmd);
	message.delete();


	if(!cmd) return message.channel.send("Et encore un qui n'est pas capable, de taper une commande valide, ça me fatigue!, Tapes +help pour avoir les commandes actives");;
	if(commande==='play' || commande==='skip' || commande==='stop')
	{
		//return message.channel.send("Fonction musique désactivée");
		if(commande==='play')
		{
			member_id[message.author.id].jeton--;
		}
		serverQueue = queue.get(message.guild.id);
		if(!args[0] && commande==='play')
		{
			return message.channel.send("Vous n'avez spécifiez pas d'adresse youtube à lire");
		}else
		{
			cmd.run(message,serverQueue);
		}
		
	}
	else
	{
		cmd.run(client,message,args);
	}


};