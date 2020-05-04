//const Discord = require ("discord.js");
//const config  =  require ( "./../config.json" );
//const prefix= config.prefix;

module.exports = async(client,oldPresence, newPresence)=>{

	let last_activity_type="";
	let last_activity_name="";

	//si l'on détecte un arrêt d'activité
	if(oldPresence)
	{
		let last_user_activity = oldPresence.activities;

		for(let activity of last_user_activity.values())
		{
			//si les information type d'activité et nom du jeux sont exploitable
			if(activity.hasOwnProperty('type') && activity.hasOwnProperty('name') )
			{
				//si l'activité concerne bien un jeux
				if (activity.type==="PLAYING")
				{
					let old_users_data = client.users.cache;
					old_users_data=old_users_data.get(oldPresence.userID);
					
					if(oldPresence.member.nickname !== null && member_id[oldPresence.userID].game!=="inc")
					{
						console.log(oldPresence.member.nickname+" a quité l'activitée : "+activity.name);
					}
					else
					{
						if (member_id[oldPresence.userID].game!== "inc")
						{
							console.log(old_users_data.username+" a quité l'activitée : "+activity.name);
						}
					}

					last_activity_type="activity.type";
					last_activity_name="activity.name";
				}

			}
		}
	}
	//si l'on détecte un debut d'activité
	if(newPresence)
	{
		let new_user_activity = newPresence.activities;

		for(let activity of new_user_activity.values())
		{
			//si les information type d'activité et nom du jeux sont exploitable
			if(activity.hasOwnProperty('type') && activity.hasOwnProperty('name') )
			{
				//si l'activité concerne bien un jeux
				if (activity.type==="PLAYING" && last_activity_type !== activity.type && last_activity_name !== activity.name)
				{
					let new_users_data = client.users.cache;
					new_users_data=new_users_data.get(newPresence.userID);

					if(newPresence.member.nickname !== null && member_id[newPresence.userID].game!=="inc")
					{
						console.log(newPresence.member.nickname+" a commencé l'activitée : "+activity.name);
					}
					else
					{
						if (member_id[newPresence.userID].game!== "inc")
						{
							console.log(new_users_data.username+" a commencé l'activitée : "+activity.name);
						}
					}
					//si le joueur est dans la BD
					if(newPresence.userID in member_id)
					{

						member_id[newPresence.userID].type=activity.type;
						member_id[newPresence.userID].game=activity.name;
						member_id[newPresence.userID].time = Date.now();
						member_id[newPresence.userID].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
					}
				}
			}
		}

	}




	/*
	let user_id = newPresence.member.id;
	
	//si l'on arrive à déterminé le userid
	if(typeof (user_id) !== "undefined")
	{
		//si cet utilisateur est bien répertorié
		//if(typeof (member_id[user_id]) !== "undefined")
		//{
			//if(typeof (member_id[user_id].game) !== "undefined" && typeof (member_id[user_id].type) !== "undefined")
			//{
				//si l'on détecte un arrêt d'activité
				if(oldPresence)
				{
					let old_user_id = oldPresence.userID
					let users = client.users.cache;
					let old_user=users.get(old_user_id);
					
					if(oldPresence.member.nickname !== null)
					{
						console.log(`Le joueur "${oldPresence.member.nickname}" a quité l'activitée "${member_id[user_id].game}"`);
					}
					else
					{
						console.log(`Le joueur "${old_user.username}" a quité l'activitée "${member_id[user_id].game}"`);
					}

					//member_id[user_id].game="inc";
					//member_id[user_id].type="inc";
					//member_id[user_id].time = Date.now();
					//member_id[user_id].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				}

				//si les informations sont reçu
				//si l'on détecte un debut d'activité

				if(newPresence)
				{
					let new_user_id = newPresence.userID
					let users = client.users.cache;
					let new_user=users.get(new_user_id);
					let user_activity = newPresence.activities;
					
					for(let activity of user_activity.values())
					{
						//si les information type d'activité et nom du jeux sont exploitable
						if(activity.hasOwnProperty('type') && activity.hasOwnProperty('name') )
						{
							//si l'activité concerne bien un jeux
							if (activity.type==="PLAYING")
							{
								//si la nouvelle activté est différente de l'ancienne
								if(member_id[user_id].game!==activity.name)
								{
									member_id[user_id].game=activity.name;
									member_id[user_id].time = Date.now();
									member_id[user_id].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
								}
								if(member_id[user_id].type!==activity.name)
								{
									member_id[user_id].type=activity.type;
									member_id[user_id].time = Date.now();
									member_id[user_id].date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
								}

								if(member_id[user_id].type!==activity.name || member_id[user_id].game!==activity.name)
								{
									if(newPresence.member.nickname !== null)
									{
										console.log(`Le joueur "${newPresence.member.nickname}" a changé d'activitée "${member_id[user_id].game}"`);
									}
									else
									{
										console.log(`Le joueur "${new_user.username}" a changé d'activitée "${member_id[user_id].game}"`);
									}
								}
								break;
							}
						}
					}
				//}
			//}
		}
	}*/
};