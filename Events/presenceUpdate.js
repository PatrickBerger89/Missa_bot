

//si un event presence update arrive (le joueur à fait quelque chose)
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

					//si le joueur n'as pas changé son peudo, nickname n'exsite pas, il faut utilisé username					
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
					//si le joueur est dans la BD on met à jour ses informations jeux
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
};