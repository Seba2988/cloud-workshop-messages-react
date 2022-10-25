import axios from "axios";

// const URL = "http://localhost:8080/";
const URL = "http://ec2-34-243-34-230.eu-west-1.compute.amazonaws.com/";
const getMessages = async () => {
	try {
		const response = await axios.get(URL + "messages");
		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const sendMessage = async (title: string, body: string) => {
	try {
		const response = await axios.post(URL + "add-message", {
			title,
			body,
		});
		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export { getMessages, sendMessage };
