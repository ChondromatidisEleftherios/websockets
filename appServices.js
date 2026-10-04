import {WebSocketManager} from "./WebSocketManager.js";

export class Operations{
	static users = [{username: "Hi", password: "123"},
		{username: "Bye", password: "321"},
		{username: "Lef", password: "Lef"},
		{username: "K0stis", password: "woof"},
		{username: "Babinos", password: "."}];

	static checkCreds(username, password){
		const [found, accountCreds] = this.findAccount(username);
		if (!found){
			return false;
		}
		const passwordsMatch = this.comparePasswords(accountCreds["password"], password);
		if (!passwordsMatch){
			return false;
		}
		return true;
	}

	static findAccount(username){
		for (const user of this.users){
			if (user["username"] === username){
				return [true, user];
			}
		}
		return [false, false];
	}

	static comparePasswords(password, givenPassword){
		return password === givenPassword;
	}

	static invite(userToInvite, connectedUser){
		const [found, accountCreds] = this.findAccount(userToInvite);
		if (!found){
			return false;
		}
		const invitedThemselves = this.invitedThemselves(userToInvite, connectedUser);
		if (invitedThemselves){
			return false;
		}
		const invited = WebSocketManager.sendInvitation(userToInvite, connectedUser);
		return invited;
	}

	static invitedThemselves(userToInvite, connectedUser){
		return userToInvite === connectedUser;
	}
}