//lancement de la lib discord
const Discord = require('discord.js')

//état de l'initialisation du bot
var ready=false;

//lancement de la lib de lecture distante
const fs=require('fs');

//lancement de la lib youtube
const ytdl = require('ytdl-core');
global.queue = new Map();
global.serverQueue ;

//récupération de la configuration
const config  =  require ( "./config.json" ) ;

//connexion à discord central et répercution sur les serveurs autorisé
const client = new Discord.Client()

//initialisation du bot
client.login(config.token)

client.commands = new Discord.Collection();

global.standby=false;

global.salons={};
global.sound_list=[];
global.member_id={};
global.salon_auto_play=["704788656896081990","704432846755987500"];//704432846755987500
global.salon_auto_says=["705683831247601665","706790312441413663"];//705683831247601665



//chargement des fichiers commandes js
fs.readdir("./Commandes/",(error,f)=>{
	if(error) console.log(error);

	let commandes=f.filter(f=>f.split(".").pop()==="js");
	if(commandes.length<=0)return console.log("Aucune commande trouvée !")

		commandes.forEach((f) => {
			let commande = require(`./Commandes/${f}`);
			console.log(`${f} commande chargée!`);
			client.commands.set(commande.help.name, commande);

		});
})

//chargement des fichiers Events js
fs.readdir("./Events/",(error,f)=>{
	if(error) console.log(error);
	console.log(`${f} events chargée!`);

	f.forEach((f)=>{
		const events = require(`./Events/${f}`);
		const event = f.split(".")[0]

		client.on(event,events.bind(null,client))

	});
})

//chargement des fichiers MP3

count=0;
let rep_mp3 = fs.readdirSync("./mp3/");
rep_mp3.forEach((rep)=>{
	let list_mp3=fs.readdirSync("./mp3/"+rep+"/");

	list_mp3.forEach((sound)=>{
		
		sound_list[count]="./mp3/"+rep+"/"+sound;
		count++;
	})

	
})

setInterval(function() {
	for (const property in member_id)
	{
		if (member_id[property].game!=="inc" && member_id[property].salon!=="inc")
		{
			if(member_id[property].salon==="702600937369370624" && member_id[property].game!=="Star Citizen")
			{
				member_id[property].alert++;

				
				let users = client.users.cache;
				console.log(client.users);
				let user=users.get(property);

				if(member_id[property].alert==1)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'est pas actif. Premier avertissement.");
					member_id[property].time = Date.now();
					member_id[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
				if(member_id[property].alert==12)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'est pas actif.");
					member_id[property].time = Date.now();
					member_id[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
				if(member_id[property].alert==24)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'est pas actif. Dernier avertissement.");
					member_id[property].time = Date.now();
					member_id[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
				if(member_id[property].alert==36)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'était pas actif. Expulsion du channel.");
					member_id[property].time = Date.now();
					member_id[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
			}
			if(member_id[property].salon==="702600937369370624" && member_id[property].game==="Star Citizen")
			{
				member_id[property].alert=0;
			}
		}
	}
}, 60000);

setInterval(function() {
	var channels = client.channels.cache;
	for(let channel of channels.values())
	{
		if(channel["type"]!=="category")
		{
			salons[channel["id"]]={};
			salons[channel["id"]].type=channel["type"];
			salons[channel["id"]].name=channel["name"];
			salons[channel["id"]].name=channel["name"];
		}
	}
	var data_salons = JSON.stringify(salons,null, 2);
	fs.writeFileSync('./db/salons.json', data_salons);

	var users = client.users.cache;
	for(let usr of users.values())
	{
		if(typeof (member_id[usr.id]) === undefined)
		{
			console.log(usr.username);
			member_id[usr.id]={};
			member_id[usr.id].id = usr['id'];
			member_id[usr.id].name = usr.username;
			member_id[usr.id].salon = "inc";;
			member_id[usr.id].game = "inc";
			member_id[usr.id].type = "inc";
			member_id[usr.id].time = Date.now();
			member_id[usr.id].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			member_id[usr.id].alert = 0;
			member_id[usr.id].jeton = 5;
		}
		else{
			//if(member_id[usr.id].hasOwnProperty('jeton'))
			//{
				if(member_id[usr.id].jeton < 5)
				{
					member_id[usr.id].jeton++;
					member_id[usr.id].time = Date.now();
					member_id[usr.id].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
			//}
			
		}
	}
	var data_members = JSON.stringify(member_id,null, 2);
	fs.writeFileSync('./db/members.json', data_members);
	//console.log('BD mise à jours');
}, 60000);

