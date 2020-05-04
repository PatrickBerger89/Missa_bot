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
				
				//console.log("total: ");
				//console.log(list_ship.length);
				//console.log("new_line: ");
				//console.log(new_line.length);
				
				if((new_line.length+list_ship.length)<2000)
				{
					list_ship=list_ship+""+new_line;
					text[mes_test]=list_ship;
				}
				else
				{
					list_ship="";
					mes_test++;
					list_ship=list_ship+""+new_line;
					text[mes_test]=list_ship;
				}
			})

			text.forEach((bloc)=>{
			//console.log(bloc.length)
			message.author.send(bloc);

		})
	})
};

module.exports.help ={
	name: "ship_list"
};