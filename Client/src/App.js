import "./App.css";
import Login from "./components/login";
import LogoutButton from "./components/logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import Home from "./components/home";
import Navside from "./components/navSide";
import { AppProvider, useAppContext } from "./context/context";

const clientId =
	"73324507888-opef35jqp0laohsng2iao5eovjtr1kk0.apps.googleusercontent.com";

function App() {
	useEffect(() => {
		function start() {
			gapi.client.init({
				clientId: clientId,
				scope: "",
			});
		}
		gapi.load("client:auth2", start);
	}, []);

	const [isAuthenticated, setAuthenticated] = useState(false);

	const handleLogin = () => {
		setAuthenticated(true);
	};

	const handleLogout = () => {
		setAuthenticated(false);
	};

	return (
		<AppProvider>
			<div className="App">
				{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
				{/* <LoginButton /> */}
				<Navside setAuthenticated={setAuthenticated} />
				{/* Main Content */}
				<div className="main-content">
					{isAuthenticated ? (
						<>
							<Home />
						</>
					) : (
						<Login onLogin={handleLogin} />
					)}
				</div>
			</div>
		</AppProvider>
	);
}

export default App;
