import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {OnlineUsersList} from "../components/OnlineUsersList.jsx";

export function Main(){

	const [onlineUsers, setOnlineUsers] = useState([]);
	const [notificationMessage, setNotificationMessage] = useState("");
	const [notificationCount, setNotificationCount] = useState(false);

	const navigate = useNavigate();

	useEffect(onPageLoad, []);

	const userId = localStorage.getItem("id");

	let ws;

	function onPageLoad(){
		async function loadMain(){
			if(!userId){
				navigate("/");
			}
			ws = new WebSocket("wss://test-app-b52q.onrender.com");

			ws.onopen = sendUserId;

			ws.onmessage = checkMessage;

			function sendUserId(){
				const objToSend = {category: "id", message: userId};
				if (ws.readyState === WebSocket.OPEN){
				ws.send(JSON.stringify(objToSend));
				}
			}

			function checkMessage(event){
				const data = JSON.parse(event["data"]);
				if (data["category"]==="greeting"){
					console.log(data["message"]);
				}
				if (data["category"]==="onlineUsers"){
					setOnlineUsers(data["message"]);
					console.log(data["message"]);
				}
				if (data["category"]==="invitation"){
					setupNotifications(data);
				}
				if (data["category"]==="notification"){
					console.log(data["message"]);
					setupNotifications({category: data["category"], message: "", count: data["message"]});
				}
			}
		}

			function setupNotifications(data){
				const {category, message, count} = data;
				setNotificationMessage(message);
				if (count > 0){
					setNotificationCount(count);
					return;
				}
				setNotificationCount(false);
			}

		loadMain();
	}

	async function sendInvite(e){
		console.log(e["target"]["textContent"]);
		try{
			const url = "http://localhost:6969/invite";
			const userInvited = e["target"]["textContent"];
			const inviteObject = {from: userId, to: userInvited};
			const response = await axios.post(url, inviteObject);
			console.log(response);
		} catch(err){
			console.error(err);
		}
	}


return (
    <section>
        <h1>Main Page</h1>
        <h2> Online users: </h2>
        {onlineUsers.length > 0 && (
            <ol>
                {onlineUsers.map(user => (
                    <OnlineUsersList key={user} name={user} invite={sendInvite}/>))}
            </ol>
        )}
        {notificationMessage!=="" && (<p> {notificationMessage} </p>)}
        {notificationCount && (<p> Notifications: {notificationCount} </p>)}
    </section>
);
}
