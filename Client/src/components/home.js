import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styled components
const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-top: 20px;
`;

const TableHeader = styled.th`
	padding: 10px;
	background-color: #f2f2f2;
	border: 1px solid #ddd;
	text-align: left;
`;

const TableRow = styled.tr`
	&:nth-child(even) {
		background-color: #f9f9f9;
	}
`;

const TableCell = styled.td`
	padding: 10px;
	border: 1px solid #ddd;
`;

const RemoveButton = styled.button`
	background-color: #e74c3c;
	color: #fff;
	border: none;
	padding: 8px 12px;
	cursor: pointer;
`;

// Convert UTC to IST
const convertToIST = (utcDateString) => {
	const options = {
		timeZone: "Asia/Kolkata",
		year: "numeric",
		month: "numeric",
		day: "numeric",
	};
	return new Date(utcDateString).toLocaleString("en-IN", options);
};

const Home = () => {
	const { googleId, login, logout } = useAppContext();
	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				const response = await axios.get("http://localhost:3001/api/invoices");
				const filteredInvoices = response.data.filter(
					(invoice) => invoice.googleId === googleId
				);
				setInvoices(filteredInvoices);
			} catch (error) {
				console.error("Error fetching invoices:", error);
			}
		};
		fetchInvoices();
		console.log(invoices);
	}, []);

	// Handle Remove Button
	const handleRemoveInvoice = (name) => {
		setInvoices((prevInvoices) =>
			prevInvoices.filter((invoice) => invoice.name !== name)
		);
	};

	//Send reminder email to user(zapier)
	const handleRemindInvoice = async (invoice) => {
		try {
			await axios.post("http://localhost:3001/api/send-reminder", {
				email: invoice.email,
				amount: invoice.amount,
				name: invoice.name,
				start_date: convertToIST(invoice.startDate),
				end_date: convertToIST(invoice.endDate),
			});
			console.log("send data!");
			toast.success("Reminder Sent to User");
		} catch (error) {
			console.error("Error Zapier integration", error);
		}
	};

	return (
		<>
			<Container>
				<h2>Due Invoice List</h2>
				<Table>
					<thead>
						<tr>
							<TableHeader>Organisation</TableHeader>
							<TableHeader>Amount</TableHeader>
							<TableHeader>Start Date</TableHeader>
							<TableHeader>End Date</TableHeader>
							<TableHeader>Action</TableHeader>
							<TableHeader>Reminder</TableHeader>
						</tr>
					</thead>
					<tbody>
						{invoices.map((invoice) => (
							<TableRow key={invoice.id}>
								<TableCell>{invoice.name}</TableCell>
								<TableCell>{invoice.amount}</TableCell>
								<TableCell>{convertToIST(invoice.startDate)}</TableCell>
								<TableCell>{convertToIST(invoice.endDate)}</TableCell>
								<TableCell>
									<RemoveButton
										onClick={() => handleRemoveInvoice(invoice.name)}
									>
										Remove
									</RemoveButton>
								</TableCell>
								<TableCell>
									<RemoveButton onClick={() => handleRemindInvoice(invoice)}>
										Remind Me
									</RemoveButton>
								</TableCell>
							</TableRow>
						))}
					</tbody>
				</Table>
			</Container>
		</>
	);
};

export default Home;
