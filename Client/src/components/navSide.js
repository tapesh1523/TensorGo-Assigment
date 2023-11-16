import React, { useState } from "react";
import logo from "../resources/TensorGo.png";
import { useAppContext } from "../context/context";
import { GoogleLogout } from "react-google-login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navside({ setAuthenticated }) {
	const clientId =
		"73324507888-opef35jqp0laohsng2iao5eovjtr1kk0.apps.googleusercontent.com";
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const { googleId, login, logout } = useAppContext();

	const handleLogout = () => {
		logout();
		setAuthenticated(false);
		toast.success("Logout successful!");
	};

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	return (
		<>
			<nav className="navbar">
				<div className="menu-icon" onClick={toggleSidebar}>
					<i className={isSidebarOpen ? "fas fa-times" : "fas fa-bars"}></i>
				</div>
				<div className="logo">
					<img src={logo} alt="Logo" height="60" width="60" />
				</div>
			</nav>

			<div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
				<ul>
					<li>Home</li>
					<li>About</li>
					{googleId && (
						<li>
							<GoogleLogout
								clientId={clientId}
								buttonText="Logout"
								onLogoutSuccess={handleLogout}
							/>
						</li>
					)}
				</ul>
			</div>
		</>
	);
}
