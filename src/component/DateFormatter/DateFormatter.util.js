import moment from "moment";

/**
 * Splits a date into day, month and year
 * @param {String} date
 * @returns {{ day:String, month:String, year:String }}
 */
function splitDate(date) {
	let newDate = date.split("T")[0];
	return {
		day: newDate.split("-")[2],
		month: newDate.split("-")[1],
		year: newDate.split("-")[0],
	};
}

/**
 * Converts the month MM format to month MMM format
 * @param {number} month
 * @returns { "JAN" | "FEB" | "MAR" | "APR" | "MAY" | "JUN" | "JUL" | "AUG" | "SEP" | "OCT" | "NOV" | "DEC" | "MMM" }
 */
function getMonth(month) {
	switch (parseInt(month)) {
		case 1:
			return "JAN";
		case 2:
			return "FEB";
		case 3:
			return "MAR";
		case 4:
			return "APR";
		case 5:
			return "MAY";
		case 6:
			return "JUN";
		case 7:
			return "JUL";
		case 8:
			return "AUG";
		case 9:
			return "SEP";
		case 10:
			return "OCT";
		case 11:
			return "NOV";
		case 12:
			return "DEC";
		default:
			return "MMM";
	}
}

/**
 * Convert the date to DD-MM-YYYY format
 * @param {String} date
 * @returns {String} Formatted Date
 */
function toDDMMYYYY(date) {
	let dateReceived = splitDate(date);
	return `${dateReceived.day}-${dateReceived.month}-${dateReceived.year}`;
}

/**
 * Convert the date to MM-DD-YYYY format
 * @param {String} date
 * @returns {String} Formatted Date
 */
function toMMDDYYYY(date) {
	let dateReceived = splitDate(date);
	return `${dateReceived.month}-${dateReceived.day}-${dateReceived.year}`;
}

/**
 * Convert the date to MMM-DD-YYYY format
 * @param {String} date
 * @returns {String} Formatted Date
 */
function toMMMDDYYYY(date) {
	let dateReceived = splitDate(date);
	return `${getMonth(dateReceived.month)} ${dateReceived.day}, ${
		dateReceived.year
	}`;
}

/**
 * Returns Formatted Date
 * @param {String} format
 * @param {String} date
 * @returns {String} Formatted date
 */
function getFormattedDate(format, date) {
	switch (format) {
		case "DD-MM-YYYY":
			return toDDMMYYYY(date);
		case "MM-DD-YYYY":
			return toMMDDYYYY(date);
		case "MMM-DD-YYYY":
			return toMMMDDYYYY(date);
		default:
			break;
	}
}

function handleException(format) {
	return new Promise((resolve, reject) => {
		if (format.indexOf("p") === -1) resolve(moment().format(format));
		else reject("format is wrong");
	});
}
export {
	splitDate,
	getMonth,
	toDDMMYYYY,
	toMMDDYYYY,
	toMMMDDYYYY,
	getFormattedDate,
	handleException,
};
