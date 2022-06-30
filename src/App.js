import React from "react";
import DateFormatter from "./component/DateFormatter/DateFormatter";

function App() {
	const dateFromDB = [
		"2022-06-26T00:16:00Z",
		"2022-06-25T08:14:03Z",
		"2022-06-27T03:26:00Z",
	];
	const format1 = "MMM, DD YYYY";
	const format2 = "MM-DD-YYYY";
	const format3 = "DD-MM-YYYY";
	return (
		<div className="App">
			<DateFormatter format={format1} date={dateFromDB[0]}/>
			<DateFormatter format={format2} date={dateFromDB[1]} />
			<DateFormatter format={format3} date={dateFromDB[2]} />
		</div>
	);
}

export default App;
