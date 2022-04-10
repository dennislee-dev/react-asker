import {act, cleanup, render} from "@testing-library/react";
import React from "react";
import CarouselItem from "./CarouselItem";
import {mount} from "enzyme";

describe('test CarouselItem component', () => {
  let component;

  //========================================================
  //========================================================

  beforeEach(async () => {
    await act(async () => {
      component = render(<CarouselItem/>);
    })
  });

  afterEach(() => {
    cleanup();
  });

  //========================================================
  //========================================================

  it('should render component', () => {
    expect(component).not.toBeNull();
  });
})
