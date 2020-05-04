const Discord = require ("discord.js");

module.exports.run = async(client,message,args) =>{
	const request = require('request')
	let text=[];
	let mes_test=0;

	request.post(
		'https://mysctools.ovh/e107_plugins/sc_trad/page/request/mreq_ship.php',
		(error, res, data) => {
			if (error) {
				console.error(error)
				return
			}
			json_data=JSON.parse(data);

			let list_ship="";

			json_data.forEach((ship)=>{
				let new_line="ID: "+ship.id+"\n"+"> *Marque* :"+ship.man+"\n > *Nom* :    "+ship.name+"\n > *Emport* :    "+ship.emport+"\n\n";
				
				//si le message fait moins de 2000 caractére
				if((new_line.length+list_ship.length)<2000)
				{
					list_ship=list_ship+""+new_line;
					text[mes_test]=list_ship;
				}
				//sinon on prépare un nouveau bloc message
				else
				{
					list_ship="";
					mes_test++;
					list_ship=list_ship+""+new_line;
					text[mes_test]=list_ship;
				}
			})
			//envoie de plusieurs message en fonction du nombre de fois que les 2000 ont été dépassé
			text.forEach((bloc)=>{
			message.author.send(bloc);

		})
	})
};

module.exports.help ={
	name: "ship_list"
};