import {WebSocketServer} from "ws";

export class WebSocketManager{
	static wss;

	static connectedUsers = new Map();

	static notifications = new Map();

	static startWebSocketServer(server){
		this.wss = new WebSocketServer({server});
		this.wss.on("connection", this.startConnection.bind(this));
	}

	static startConnection(ws){
		console.log(`user ${ws} connected!`);

		ws.send(JSON.stringify({category: "greeting", message:"Welcome!"}));

		ws.on("message", this.getMessage.bind(this, ws));

		ws.on("close", this.disconnectUser.bind(this, ws));
	}

	static getMessage(ws, data){
		const messageObj = JSON.parse(data);
		if (messageObj["category"] === "id"){
			const idExists = this.checkIfIdExists(messageObj["message"]);
			if (!idExists){
				this.connectedUsers.set(messageObj["message"], ws);
				console.log(this.connectedUsers);
				this.getOnlineUsers();
				this.getNotifications(messageObj["message"], ws);
			}
		}
	}

	static checkIfIdExists(userId){
		if(this.connectedUsers.get(userId) === undefined || userId === null){
			return false;
		}
		return true;
	}

	static getOnlineUsers(){
		const connectedUsersMap = this.connectedUsers;
		const users = [];
		for (const [user, sock] of connectedUsersMap){
			users.push(user);
		}
		console.log("getOnlineUsers Socket");
		const objToSend = {category: "onlineUsers", message: users};
		for (const [user, sock] of connectedUsersMap){
			sock.send(JSON.stringify(objToSend));
		}
	}

	static disconnectUser(ws){
		const connectedUsersMap = this.connectedUsers;
		for (const [user, sock] of connectedUsersMap){
			if (sock === ws){
				connectedUsersMap.delete(user);
				break;
			}
		}
		this.connectedUsers = connectedUsersMap;
		console.log("user deleted!");
		this.getOnlineUsers();
	}

	static sendInvitation(userToInvite, connectedUser){
		console.log("invitation!");
		let notificationsCount = this.notifications.get(userToInvite);
		this.notifications.set(userToInvite, (!notificationsCount ? 1 : ++notificationsCount));
		const objToSend = {category: "invitation", message: `User ${connectedUser} has invited you!`, count: this.notifications.get(userToInvite)};
		const sock = this.connectedUsers.get(userToInvite);
		sock.send(JSON.stringify(objToSend));
		return true;
	}

	static getNotifications(user, ws){
		const userNotifications = this.notifications.get(user);
		const objToSend = {category: "notification", message: userNotifications};
		console.log("....", objToSend);
		ws.send(JSON.stringify(objToSend));
	}
}