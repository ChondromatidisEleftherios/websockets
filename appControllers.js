import {Operations} from "./appServices.js";

export async function login(req, res){
	const statusObj = {status: false};
	const body = req["body"];
	const {name, pass} = body;
	console.log(`${name} - ${pass}`);
	const success = Operations.checkCreds(name, pass);
	if(!success){
		statusObj["status"] = false;
		res.status(400).json(statusObj);
		return;
	}
	statusObj["status"] = true;
	res.status(200).json(statusObj);
	return;
}

export async function invite(req, res){
	const statusObj = {status: false};
	const body = req["body"];
	const connectedUser = body["from"].trim();
	const userToInvite = (body["to"]).trim();
	const userInvited = Operations.invite(userToInvite, connectedUser);
	if (!userInvited){
		res.status(400).json(statusObj);
		return;
	}
	statusObj["status"] = true;
	res.status(200).json(statusObj);
	return;
}