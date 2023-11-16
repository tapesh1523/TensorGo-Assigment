import React from "react";
import { GoogleLogin } from "react-google-login";
import { useAppContext } from "../context/context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const GoogleLoginButton = styled.div`
	margin-top: 20px;
	.google-login-button {
		background-color: #4285f4;
		color: #fff;
		border: none;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.google-logo {
		margin-right: 10px;
	}
`;

const Login = ({ onLogin }) => {
	const { googleId, login, logout } = useAppContext();
	const clientId =
		"73324507888-opef35jqp0laohsng2iao5eovjtr1kk0.apps.googleusercontent.com";

	const onSuccess = async (res) => {
		console.log("Login Success! Current User:", res.profileObj);
		toast.success("Login successful!");

		login(res.profileObj.googleId);

		try {
			const response = await fetch("http://localhost:3001/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					googleId: res.profileObj.googleId,
					username: res.profileObj.name,
					email: res.profileObj.email,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				onLogin();
			} else {
				console.error("Failed to store user data on the server");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const onFailure = (res) => {
		console.log("Login Failed! res:", res);
	};

	return (
		<Container>
			<h1>Welcome to Your App</h1>
			<GoogleLoginButton>
				<GoogleLogin
					clientId={clientId}
					buttonText="Login with Google"
					onSuccess={onSuccess}
					onFailure={onFailure}
					cookiePolicy={"single_host_origin"}
					isSignedIn={true}
					render={(renderProps) => (
						<button
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
							className="google-login-button"
						>
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
								alt="Google logo"
								className="google-logo"
							/>
							Login with Google
						</button>
					)}
				/>
			</GoogleLoginButton>
		</Container>
	);
};

export default Login;
