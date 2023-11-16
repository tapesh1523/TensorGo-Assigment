import { GoogleLogout } from "react-google-login";
import { useAppContext } from "../context/context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const clientId =
	"73324507888-opef35jqp0laohsng2iao5eovjtr1kk0.apps.googleusercontent.com";

const Logout = () => {
	const { googleId, login, logout } = useAppContext();

	const onSuccess = () => {
		logout();
		console.log(googleId);
		toast.success("Logout successful!");
	};

	return (
		<div id="signOutButton">
			<GoogleLogout
				clientId={clientId}
				buttonText="Logout"
				onLogoutSuccess={onSuccess}
			/>
		</div>
	);
};
export default Logout;
