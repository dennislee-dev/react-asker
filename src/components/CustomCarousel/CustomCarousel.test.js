import {act, cleanup, render} from "@testing-library/react";
import React from "react";
import CustomCarousel from "./CustomCarousel";
import {mount} from "enzyme";
import {carouselData} from "./CarouselItem/CarouselData";
import {createMoveTouchEventObject, createStartTouchEventObject} from "./EventHelpers";

jest.useFakeTimers();

describe('test CustomCarousel component', () => {
  let component;

  //========================================================
  //========================================================

  beforeEach(async () => {
    await act(async () => {
      component = render(<CustomCarousel/>);
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

  //========================================================
  //========================================================

  it('testing click next', async () => {
    cleanup();
    component = mount(<CustomCarousel data={carouselData} interval={300} autoPlay={false}/>);
    await act(async () => {
      component.find('.arrowButton').at(1).simulate('click');
      jest.runAllTimers();
    })
    component.update();
    expect(component.find('.sliders').prop('style')).toHaveProperty('transform', 'translate3d(calc(-100% - 0px),0,0)');
  });

  //========================================================
  //========================================================

  it('testing click prev', async () => {
    cleanup();
    component = mount(<CustomCarousel data={carouselData} interval={300} autoPlay={false}/>);
    await act(async () => {
      component.find('.arrowButton').at(0).simulate('click');
      jest.runAllTimers();
    })
    component.update();
    expect(component.find('.sliders').prop('style')).toHaveProperty('transform', 'translate3d(calc(-100% - 0px),0,0)');
  });

  //========================================================
  //========================================================

  it('testing touch start > 50px', async () => {
    cleanup();
    component = mount(<CustomCarousel data={carouselData} interval={300} autoPlay={false}/>);
    await act(async () => {
      await component.find('.slidersWrapper').simulate('touchMove',
        createStartTouchEventObject({x: 100, y: 0}));
      await component.find('.slidersWrapper').simulate('touchEnd',
        createMoveTouchEventObject({x: 200, y: 0}, true));
      jest.runAllTimers();
    })
    component.update();
    expect(component.find('.sliders').prop('style')).toHaveProperty('transform', 'translate3d(calc(-100% - 0px),0,0)');
  });

  //========================================================
  //========================================================

  it('testing touch start < -50px', async () => {
    cleanup();
    component = mount(<CustomCarousel data={carouselData} interval={300} autoPlay={false}/>);
    await act(async () => {
      await component.find('.slidersWrapper').simulate('touchMove',
        createStartTouchEventObject({x: 200, y: 0}));
      await component.find('.slidersWrapper').simulate('touchEnd',
        createMoveTouchEventObject({x: 100, y: 0}, true));
      jest.runAllTimers();
    })
    component.update();
    expect(component.find('.sliders').prop('style')).toHaveProperty('transform', 'translate3d(calc(-100% - 0px),0,0)');
  });

  //========================================================
  //========================================================

  it('testing with autoplay', async () => {
    cleanup();
    component = mount(<CustomCarousel data={carouselData} interval={300} autoPlay={true}/>);
    await act(async () => {
      await component.find('.slidersWrapper').simulate('touchMove',
        createStartTouchEventObject({x: 200, y: 0}));
      await component.find('.slidersWrapper').simulate('touchEnd',
        createMoveTouchEventObject({x: 100, y: 0}, true));
      jest.advanceTimersByTime(1000);
    })
    component.update();
    expect(component.find('.sliders').prop('style')).toHaveProperty('transform', 'translate3d(calc(-100% - 0px),0,0)');
  });

  //========================================================
  //========================================================

  it('testing with autoplay', async () => {
    cleanup();
    component = mount(<CustomCarousel data={carouselData} interval={300} autoPlay={true}/>);
    await act(async () => {
      await component.find('.slidersWrapper').simulate('touchMove',
        createStartTouchEventObject({x: 200, y: 0}));
      await component.find('.slidersWrapper').simulate('touchEnd',
        createMoveTouchEventObject({x: 100, y: 20}, true));
      jest.advanceTimersByTime(1000);
    })
    component.update();
    expect(component.find('.sliders').prop('style')).toHaveProperty('transform', 'translate3d(calc(-100% - 0px),0,0)');
  });

  //========================================================
  //========================================================

  it('testing onMouseOver', async () => {
    cleanup();
    component = mount(<CustomCarousel data={carouselData} interval={300} autoPlay={true}/>);
    await act(async () => {
      await component.find('.slidersWrapper').simulate('mouseOver');
      await component.find('.slidersWrapper').simulate('mouseLeave');
      jest.advanceTimersByTime(1000);
    })
    component.update();
    expect(component.find('.sliders').prop('style')).toHaveProperty('transform', 'translate3d(calc(-100% - 0px),0,0)');
  });
})
