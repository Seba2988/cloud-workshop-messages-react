import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { IMessage } from "./models/message.model";
import { getMessages, sendMessage } from "./server/messages";

function App() {
	const [messages, setMessages] = useState<IMessage[]>([]);

	useEffect(() => {
		getMessages().then((newMessages) => {
			setMessages(newMessages);
		});
	}, []);

	const onSubmitForm = (event) => {
		event.preventDefault();
		const title = event.target.children[0].value;
		const body = event.target.children[1].value;
		sendMessage(title, body)
			.then(() => {
				return getMessages();
			})
			.then((newMessages) => {
				setMessages(newMessages);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				event.target.reset();
			});
	};

	return (
		<div>
			<h1>Messages</h1>
			<form onSubmit={onSubmitForm}>
				<input type="text" placeholder="Title" />
				<input type="text" placeholder="Body" />
				<button type="submit">Submit</button>
			</form>
			{messages.map((message) => {
				return (
					<div key={message._id}>
						<h3>{message.title}</h3>
						<p>{message.body}</p>
						<hr />
					</div>
				);
			})}
		</div>
	);
}

export default App;
