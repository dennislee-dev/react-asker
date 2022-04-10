import React, { useEffect, useRef, useState } from 'react';
//@ts-ignore
import styles from './CustomCarousel.module.scss';
import CarouselArrow from "../UI/icons/CarouselArrow";
import CarouselAnswerItem from "../../container/WatchAnswer/CarouselAnswerItem/CarouselAnswerItem";
import CarouselAskerItem from "../../container/ViewAsker/CarouselAskerItem/CarouselAskerItem";


const CustomCarousel = ({data = [], interval = 5000, autoPlay = true, type = '', state = {}, ...props}) => {
  const [itemIndex, setItemIndex] = useState(1);
  const [slides, setSlides] = useState([]);
  const [autoplay, setAutoplay] = useState(autoPlay);
  const [moveSlideStartX, setMoveSlideStartX] = useState(0);
  const [moveSlideStartY, setMoveSlideStartY] = useState(0);
  const [moveSlideEndY, setMoveSlideEndY] = useState(0);
  const [transition, setTransition] = useState(0);
  const [move, setMove] = useState(0);
  const [blockBody, setBlockBody] = useState(false);
  const [checkBlockBodyTimeout, setCheckBlockBodyTimeout] = useState(true);
  const [checkBlockSlider, setCheckBlockSlider] = useState(false);
  const [isLockBodyTimer, setIsLockBodyTimer] = useState(false);
  let endMove = -1;

  const Next = (e) => {
    e.preventDefault();
    // @ts-ignore
    document.activeElement.blur();
    setTransition(350);
    setItemIndex(2);
    const move= slides[0];
    setTimeout(() => {
      setTransition(0);
      setSlides([...slides.slice(1), move]);
      setItemIndex(1);
    }, 350)
  };

  useEffect(() => {
    // if(data != null && type === 'watchAnswer') {
    //   setSlides(data.answer_list)
    // } else {
    // }
      setSlides(data);
  }, [data])

  const Prev = (e) => {
    e.preventDefault();
    setTransition(350)
    setItemIndex(0);
    const move = slides[slides.length - 1];
    setTimeout(() => {
      setTransition(0);
      setSlides([move, ...slides.slice(0, -1)]);
      setItemIndex(1);
    }, 350)
  };

  const isAutoplay = () => {
    /* istanbul ignore else */
    if (autoplay) {
      return Next();
    }
  }

  const savedCallback = useRef();
  useEffect(() => {
    //@ts-ignore
    savedCallback.current = isAutoplay;
  }, [savedCallback, isAutoplay]);

  useEffect(() => {
    const tick = () => {
      //@ts-ignore
      savedCallback.current();
    }

    /* istanbul ignore else */
    if (autoPlay) {
      if (interval !== null) {
        const id = setInterval(tick, interval);
        return () => clearInterval(id);
      }
    }
  }, [interval, autoplay]);


  const calculation = () => {
    if (endMove - moveSlideStartX > 50) {
      Prev();
    }
    if (endMove - moveSlideStartX < -50) {
      Next();
    }
    setTransition(350);
    setMove(0);
    setMoveSlideStartX(0);
    setMoveSlideStartY(0);
    setMoveSlideEndY(0);
  }

  const isLockBody = () => {
    /* istanbul ignore else */
    if (Math.abs(moveSlideStartY - moveSlideEndY) < 10) {
      setBlockBody(true);
    } else {
      setCheckBlockSlider(true);
    }
  }

  useEffect(() => {
    if (isLockBodyTimer)
      isLockBody();
  }, [isLockBodyTimer])

  const touchMove = (e) => {
    setTransition(0);
    setAutoplay(false);
    /* istanbul ignore else */
    if (checkBlockBodyTimeout) {
      setTimeout(() => {
        setIsLockBodyTimer(true);
      }, 10)
    }
    setCheckBlockBodyTimeout(false);
    /* istanbul ignore else */
    if (!checkBlockSlider) {
      if (moveSlideStartX === 0) {
        /* istanbul ignore else */
        setMoveSlideStartX(e.touches[0].clientX);
        setMoveSlideStartY(e.touches[0].clientY);
      } else {
        setMove(moveSlideStartX - e.touches[0].clientX);
        setMoveSlideEndY(e.touches[0].clientY);
      }
    } else {
      setMove(0);
    }
  }

  useEffect(() => {
    document.body.style.overflowY = blockBody ? 'hidden' : 'auto';
  }, [blockBody])

  const touchEnd = (e) => {
    endMove = (e.changedTouches[0].pageX);
    calculation();
    setAutoplay(autoPlay);
    setBlockBody(false);
    setCheckBlockBodyTimeout(true);
    setCheckBlockSlider(false);
    setIsLockBodyTimer(false);
  };

  const renderItems = (index, item) => {
    // console.log('item', item);
    if (type === 'watchAnswer') {
      return <CarouselAnswerItem  state={state} data={props?.answerData} item={item} />
    } else if (type === 'viewAsker') {
      return <CarouselAskerItem index={index} state={state} data={data} item={item} viewAsker={props.viewAsker} nextQuestionList={props.nextQuestionList}/>
    }
  }

  return (
    <div className={styles.customCarousel}>
      <div className={styles.arrows}>
        <button type='button' className={styles.arrowButton} onClick={(e) => Prev(e)}><CarouselArrow/></button>
        <button type='button' className={styles.arrowButton} onClick={(e) => Next(e)}><CarouselArrow/></button>
      </div>
      <div
        className={styles.slidersWrapper}
        onTouchMove={(e) => touchMove(e)}
        onTouchEnd={(e) => touchEnd(e)}
        onMouseOver={() => setAutoplay(false)}
        onMouseLeave={() => {
          setAutoplay(autoPlay)
        }}
      >
        <div className={styles.sliders} style={{transform: `translate3d(calc(-${(itemIndex * 100)}% - ${move}px),0,0)`, transitionDuration: transition + `ms`}}>
          {
            slides?.map((item, index) =>
              <div key={'carousel-' + index} className={styles.slide}>
                {renderItems(index, item)}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
