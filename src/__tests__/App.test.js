import App from "./../app/App";
import React from "react";
import { findByTestAttr } from './../utils/testUtils'
import { shallow } from "enzyme";

const setup = () => shallow(<App />)

describe("App ", () => {
  test("render without error", () => {
    const wrapper = setup()
    const appComponent = findByTestAttr(wrapper,'test-app')
    expect(appComponent.length).toBe(1)
  });
  test("should suspend rendering while they load data from a cache", () => {
    const wrapper = setup()
    const appComponent =findByTestAttr(wrapper,'test-cache-loading')
    expect(appComponent.length).toBe(1)
  });
  test("should load data from routes", () => {
    const wrapper = setup()
    const appComponent = findByTestAttr(wrapper,'test-routes')
    expect(appComponent.length).toBe(1)
  });
});
