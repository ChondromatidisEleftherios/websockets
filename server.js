import {createServer} from "http";
import app from "./app.js";
import {WebSocketManager} from "./WebSocketManager.js";

const server = createServer(app);

const appPort = 6969;

WebSocketManager.startWebSocketServer(server);

server.listen(appPort, runApp);

function runApp(){
	console.log("App running!");
}