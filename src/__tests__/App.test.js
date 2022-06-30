import React from "react";
import App from "../App";
import DateFormatter from "../component/DateFormatter/DateFormatter";
import { shallow } from "enzyme";

describe("App", () => {
	let appWrapper;
	beforeAll(() => {
		appWrapper = shallow(<App />);
	});
	it("has a div component with className App", () => {
		expect(appWrapper.find(".App").exists()).toBe(true);
	});
	it("has 3 DateFormatter components", () => {
		let appWrapper = shallow(<App />);
		expect(appWrapper.find(DateFormatter)).toHaveLength(3);
	});
});

describe('DateFormatter', () => { 

	it("has a format property thats not undefined", () => {
		let appWrapper = shallow(<App />);
		appWrapper.find(DateFormatter).forEach((DateFormatterWrapper) => {
			expect(DateFormatterWrapper.prop('format')).not.toBeUndefined()
		});
	});
	it("has a prop date that is not undefined",()=>{
		let appWrapper = shallow(<App />);
		appWrapper.find(DateFormatter).forEach((DateFormatterWrapper) => {
			expect(DateFormatterWrapper.prop('date')).not.toBeUndefined()
		});
	})
	it("has a prop date that follows the given pattern",()=>{
		let appWrapper = shallow(<App />);
		appWrapper.find(DateFormatter).forEach((DateFormatterWrapper) => {
			expect(DateFormatterWrapper.prop('date')).toMatch(/[0-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-9]{2}Z/)
		});
	})
 })
