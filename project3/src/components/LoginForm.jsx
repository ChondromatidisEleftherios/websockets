import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function LoginForm(){

	const navigate = useNavigate();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [loginStatus, setLoginStatus] = useState();

	async function login(e){
		e.preventDefault();
		try{
			const url = "https://https://test-app-b52q.onrender.com/login";
			const credentials = {name: username, pass: password};
			console.log(credentials);
			const response = await axios.post(url, credentials);
			if (response["data"]["status"]){
				localStorage.setItem("id", username);
				navigate("/main");
			}
		} catch(err){
			console.error(err);
			setLoginStatus(false);
		}
	}

	function onUsernameChange(e){
		setUsername(e.target.value);
	}

	function onPasswordChange(e){
		setPassword(e.target.value);
	}

	return(
		<form onSubmit={login}>
			<label htmlFor="username"> Username: </label>
			<input type="text" name="username" placeholder="Insert Your username..." required onChange={onUsernameChange}/> <br/> <br/>
			<label htmlFor="password"> Password: </label>
			<input type="password" name="password" placeholder="Insert Your password..." required onChange={onPasswordChange}/> <br/><br/>
			<button type="submit"> Submit </button>
			{(loginStatus===false) && (<h1> Wrong Credentials </h1>)}
		</form>
		);
}
