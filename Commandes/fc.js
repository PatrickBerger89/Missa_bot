module.exports.run = async (client,message,args) =>{

	if(!args[0])
	{
		return message.author.send("Vous n'avez spécifiez l'id du vaisseaux'");
	}
	if(isNaN(args[0]))
	{
		return message.author.send("Vous n'avez spécifiez un nombre réelle pour l'id du vaisseaux");
	}

	if(!args[1])
	{
		return message.author.send("Vous n'avez spécifiez l'argent disponible");
	}
	if(isNaN(args[1]))
	{
		return message.author.send("Vous n'avez spécifiez un nombre réelle pour l'argent disponible");
	}

	//on charge la methode request pour faire une demande post
	const request = require('request')
	let text=[];
	let mes_test=0;
	console.log(args)
	console.log('https://mysctools.ovh/e107_plugins/sc_trad/page/request/mreq_fc.php?ship='+args[0]+'&balance='+args[1])
	request.post(
		'https://mysctools.ovh/e107_plugins/sc_trad/page/request/mreq_fc.php?ship='+args[0]+'&balance='+args[1],
		(error, res, data) => {
			if (error) {
				console.error(error)
				return
			}
			json_data=JSON.parse(data);

			let list_ship="";

			json_data.forEach((product)=>{
				let new_line="Produit: "+product.product_name+"\n"+"> **Quantité achetable** :"+product.scu+" SCU\n > **Prix d'achat** :    "+product.achat+" aUEC\n > **Bénéfice** :    "+product.benef+" aUEC\n\n";
				
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
				message.reply(bloc);

			})
		})
	
};

module.exports.help ={
	name: "fc"
};