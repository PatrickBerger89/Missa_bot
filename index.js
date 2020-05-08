//lancement de la lib discord
const Discord = require('discord.js')

//connexion à discord central et répercution sur les serveurs autorisé
const client = new Discord.Client()

//état de l'initialisation du bot
var ready=false;

//lancement de la lib de lecture distante
const fs=require('fs');

//lancement et création des variable de la lib youtube
const ytdl = require('ytdl-core');
global.queue = new Map();
global.serverQueue ;

//récupération de la configuration
const config  =  require ( "./config.json" ) ;



//initialisation du bot sur les serveurs abonné
client.login(config.token)

//variable permettant ou pas à missa de rester dans un salon à la fin d'une lecture
global.standby=false;

//tableau qui contiendra tous les salons
global.salon_list={};

//tableau qui contiendra tous les son de la commande rh
global.sound_list=[];

//tableau qui contiendra tous les membres
global.monkeys_list={};

//id du salon ou seront déplacé les joueurs à calmer quelque instant
global.salon_kill='597787997936549899';

//liste des salons où missa lancera le théme avenger
global.salon_auto_play=["704788656896081990","704432846755987500"];

//liste des salons où missa souhaitera la bienvenue
global.salon_auto_says=["705683831247601665","706790312441413663"];



client.commands = new Discord.Collection();
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

//prototype de fonction permettant d'agir si un membre de fait pas le bon jeux dans un salon réservé à un jeu spécifique
setInterval(function() {
	/*for (const property in monkeys_list)
	{
		if (monkeys_list[property].game!=="inc" && monkeys_list[property].salon!=="inc")
		{
			if(monkeys_list[property].salon==="702600937369370624" && monkeys_list[property].game!=="Star Citizen")
			{
				monkeys_list[property].alert++;

				
				let users = client.users.cache;
				console.log(client.users);
				let user=users.get(property);

				if(monkeys_list[property].alert==1)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'est pas actif. Premier avertissement.");
					monkeys_list[property].time = Date.now();
					monkeys_list[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
				if(monkeys_list[property].alert==12)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'est pas actif.");
					monkeys_list[property].time = Date.now();
					monkeys_list[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
				if(monkeys_list[property].alert==24)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'est pas actif. Dernier avertissement.");
					monkeys_list[property].time = Date.now();
					monkeys_list[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
				if(monkeys_list[property].alert==36)
				{
					user.send("Attention, vous êtes dans un salon réservé aux joueurs de Star Citizen, mais votre jeux n'était pas actif. Expulsion du channel.");
					monkeys_list[property].time = Date.now();
					monkeys_list[property].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
			}
			if(monkeys_list[property].salon==="702600937369370624" && monkeys_list[property].game==="Star Citizen")
			{
				monkeys_list[property].alert=0;
			}
		}
	}*/
}, 60000);


//mise à jours de la base de données des salons et membres
setInterval(function() {
	/*//chargement de la lib mysql_lite3
	var sqlite3 = require('sqlite3').verbose();

	//récupération de l'objet db
	const sqlite = require("./class/db.js")

	//récupération de l'objet monkey
	const monkeys = require("./class/monkey.js")

	//récupération de l'objet monkey
	const salons_m = require("./class/salon.js")

	//parcours des salons
	let channels = client.channels.cache;
	for(let channel of channels.values())
	{
		//on prépare l'objet monkeys
		let salon= new salons_m();
		console.log("salon : "+salon)
		
		//on recherche un correspondance avec un salon existant
		let info = await salon.search_s(channel["id"]).then()
	/*	//si le salon n'exsite pas on le créé
		if( info === null){result = await salon.create_s(channel).then();}
		//sinon on le met à jours de toute façon
		else{result = await salon.update_s(channel).then();}

		salon_list[channel["id"]]=salon;

		//console.log(salon[channel["id"]]);
	*//*}
/*
	let users = client.users.cache;
	for(let usr of users.values())
	{
		//on prépare l'objet monkeys
		let monkey= new monkeys();
		
		//on recherche un correspondance avec un utilisateur existant
		info = await monkey.search_m(usr['id']).then()
		if( info === null)
		{
			result = await monkey.create_m(usr).then()
			console.log(result)
		}
		else
		{
			if(monkeys_list[usr.id].jeton < 5)
			{
				monkeys_list[usr.id].jeton++;
				monkeys_list[usr.id].time = Date.now();
				monkeys_list[usr.id].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			}

			console.log(info)
		}

		monkeys_list[usr.id]=monkey;


		
	}
*/
	//transformation en json stockable
	//var data_salons = JSON.stringify(salons,null, 2);
	//ecriture du fichier JSON
	//fs.writeFileSync('./db/salons.json', data_salons);
	/*
	//parcours des utilisateur
	var users = client.users.cache;
	for(let usr of users.values())
	{
		//si le membre n'existe pas, on lui crée une nouvelle fiche
		if(typeof (monkeys_list[usr.id]) === undefined)
		{
			//console.log(usr.username);
			//on prépare le tableau à stocker
			monkeys_list[usr.id]={};
			monkeys_list[usr.id].id = usr['id'];
			monkeys_list[usr.id].name = usr.username;
			monkeys_list[usr.id].salon = "inc";;
			monkeys_list[usr.id].game = "inc";
			monkeys_list[usr.id].type = "inc";
			monkeys_list[usr.id].time = Date.now();
			monkeys_list[usr.id].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			monkeys_list[usr.id].alert = 0;
			monkeys_list[usr.id].jeton = 5;
		}
		//sinon on mets sa fiche à jours
		else{
			//if(monkeys_list[usr.id].hasOwnProperty('jeton'))
			//{
				if(monkeys_list[usr.id].jeton < 5)
				{
					monkeys_list[usr.id].jeton++;
					monkeys_list[usr.id].time = Date.now();
					monkeys_list[usr.id].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}
			//}
			
		}
	}
	//transformation en json stockable
	var data_members = JSON.stringify(monkeys_list,null, 2);
	//ecriture du fichier JSON
	fs.writeFileSync('./db/members.json', data_members);
	//console.log('BD mise à jours');
	*/
}, 60000);

