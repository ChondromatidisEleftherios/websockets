export function OnlineUsersList({name, invite}){
	return(
	<li onClick={invite}> {name} </li>
	);
}