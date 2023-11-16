// AppContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [googleId, setGoogleId] = useState(null);

	const login = (googleId) => {
		setGoogleId(googleId);
	};

	const logout = () => {
		setGoogleId(null);
		console.log("logout successfully");
	};

	return (
		<AppContext.Provider value={{ googleId, login, logout }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
