import React from "react";
import { mount, shallow } from "enzyme";
import DateFormatter from "../component/DateFormatter/DateFormatter";
import moment from "moment";
import { handleException } from "../component/DateFormatter/DateFormatter.util";

describe("DateFormatter", () => {
	let defaultProps;
	beforeEach(() => {
		defaultProps = {
			date: "2022-06-26T00:16:00Z",
			format: "DD-MM-YYYY",
		};
	});
	it("has a div component", () => {
		let appWrapper = shallow(<DateFormatter {...defaultProps} />);
		expect(appWrapper.find("div").exists()).toBe(true);
	});

	it("has a div that renders a p", () => {
		let appWrapper = shallow(<DateFormatter {...defaultProps} />);
		expect(appWrapper.find("div").find("p").exists()).toBe(true);
	});

	it("has a p that must have a string", () => {
		let appWrapper = shallow(<DateFormatter {...defaultProps} />);
		expect(appWrapper.find("div").find("p").text().length).toBeGreaterThan(0);
	});
	it("has prop date that must not be undefined", () => {
		let appWrapper = mount(<DateFormatter {...defaultProps} />);
		expect(appWrapper.prop("date")).not.toBeUndefined();
	});

	it("has prop format that must not be undefined", () => {
		let appWrapper = mount(<DateFormatter {...defaultProps} />);
		expect(appWrapper.prop("format")).not.toBeUndefined();
	});

	//negative test case
	it("handles if prop date is undefined by assigning current date", () => {
		const defaultPropsMissing = {
			format: "DD-MM-YYYY",
		};
		let appWrapper = mount(<DateFormatter {...defaultPropsMissing} />);
		expect(appWrapper.find("div").find("p").text()).toBe(
			moment().format(defaultPropsMissing.format)
		);
	});
	it("handles if prop format is undefined by assigning utc format", () => {
		const defaultPropsMissing = {
			date: "2022-06-26T00:16:00Z",
		};
		let appWrapper = mount(<DateFormatter {...defaultPropsMissing} />);
		expect(appWrapper.find("div").find("p").text()).toBe(
			moment(defaultPropsMissing.date).format()
		);
	});
	it("handles if both props are undefined by assigning current date and utc format", () => {
		let appWrapper = mount(<DateFormatter />);
		expect(appWrapper.find("div").find("p").text()).toBe(moment().format());
	});
	
	it("handles if format has invalid characters", async () => {
		let defaultPropsError = {
			date: "2022-06-26T00:16:00Z",
			format: "DD-MM-p",
		};
		expect.assertions(1);
		try {
			expect(await handleException(defaultPropsError.format)).toBe(
				moment().format(defaultProps.format)
			);
		} catch (e) {
			expect(e).toBe("format is wrong");
		}
	});
});
describe("momentjs", () => {
	let defaultProps;
	beforeEach(() => {
		defaultProps = {
			date: "2022-06-26T00:16:00Z",
			format: "DD-MM-YYYY",
		};
	});
	const mockdDateFromDB = [
		"2022-06-26T00:16:00Z",
		"2022-06-25T08:14:03Z",
		"2022-06-27T03:26:00Z",
	];
	const MockFormat1 = "MMM, DD YYYY";
	const MockFormat2 = "MM-DD-YYYY";
	const MockFormat3 = "DD-MM-YYYY";
	it("formats date in given format", () => {
		let appWrapper = shallow(<DateFormatter {...defaultProps} />);
		let momentTest = moment(mockdDateFromDB[0]);
		expect(appWrapper.find("div").find("p").text().length).toBeGreaterThan(0);
		expect(momentTest.format(MockFormat1)).toBe("Jun, 26 2022");
		expect(momentTest.format(MockFormat2)).toBe("06-26-2022");
		expect(momentTest.format(MockFormat3)).toBe("26-06-2022");
	});

	//negative test cases
	it("handles negative year in all formats", () => {
		let momentTest = moment(mockdDateFromDB[0]);
		expect(momentTest.year(-1).format("YY")).toBe("-01");
		expect(momentTest.year(-1).format("YYYY")).toBe("-0001");
	});
	it("if no format is specified, it takes utc as default format", () => {
		let momentTest = moment(mockdDateFromDB[0]);
		expect(momentTest.format()).toMatch(
			/\d{4}.\d\d.\d\dT\d\d.\d\d.\d\d[\+\-]\d\d:\d\d/
		);
	});
	it("handles long year formats like YYYYYY", () => {
		let momentTest = moment(mockdDateFromDB[0]);
		expect(momentTest.year(2022).format("YYYYYY")).toBe("+002022");
	});
	it("handles invalid", () => {
		expect(moment.invalid().format(MockFormat1)).toBe("Invalid date");
	});
});
