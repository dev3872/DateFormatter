import React  from "react";
import moment from "moment";
function DateFormatter({ format, date }) {
	return (
		<div>
			<p>{moment(date).format(format)}</p>
		</div>
	);
}

export default DateFormatter;
