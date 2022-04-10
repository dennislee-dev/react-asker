import React, {useEffect, useState} from 'react';
import styles from './Home.module.scss'
import ClockIcon from "../../components/UI/icons/ClockIcon";

import {useDelayUnmount} from "../../hooks/useDelayHook";
import {useLocation, useNavigate} from "react-router-dom";

const HomeStart = (props) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [isMounted, setIsMounted] = useState(true);
  const shouldRenderChild = useDelayUnmount(isMounted, 500);
  const mountedStyle = {opacity: 1, transition: "opacity 600ms ease-in"};
  const unmountedStyle = {opacity: 0, transition: "opacity 600ms ease-in"};
  // const allLinksRef = document.querySelectorAll('a')
  // console.log(allLinksRef)
  const handleToggleClicked = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const locationRef = e.currentTarget.location.href
    // //////one variant
    // console.log('currentTarget',e.path.some(item =>item.href))
    // // console.log(e, e.path.some(item =>item))
    //

    if (e.path.some(item => {
     if(item.href != null && locationRef !==item.href) {
       return true
     }
    })) {

      setTimeout(() => {
        // console.log('this timeout')
        // navigate('/log-in');
      }, 400)
      setIsMounted(!isMounted);
    }
    //////one variant

    //////two variant


    //////two variant


    // if(pathname!=='/'){

    // }
    // console.log(e.path.some(item=>(item.href != null)))

  }
  // function findLink(el) {
  //   if (el.tagName == 'A' && el.href) {
  //     return el.href;
  //   } else if (el.parentElement) {
  //     return findLink(el.parentElement);
  //   } else {
  //     return null;
  //   }
  // };

  // function callback(e) {
  //   e.preventDefault();
  //
  //   const link = findLink(e.target);
  //   // console.log('LINK',e.currentTarget.pathname === '/')
  //   if (link == null ) { return; }
  //   // e.currentTarget.location.pathname
  //
  //   handleToggleClicked()
  //   // console.log('link')
  //
  //   // Do something here
  // };
  useEffect(() => {
    window.addEventListener('click', handleToggleClicked, false)

    return () => window.removeEventListener('click', handleToggleClicked)
  }, [])

  return (
    <>
      {shouldRenderChild &&
        // <Child style={isMounted ? mountedStyle : unmountedStyle} />
        <div className={styles.askerWrapper} style={isMounted ? mountedStyle : unmountedStyle} id="homeTiltWrapper">
          <div className={`${styles.askerRow}`}>
            <div className={`${styles.askerCol}`}>
              <div className={`${styles.imgWrap}`}>
                <div className={styles.shadow}/>
                <div className={styles.listingImg}>
                  <div className={styles.iconImg}/>
                </div>
              </div>
            </div>
            <div className={`${styles.askerCol}`}>
              <div className={styles.question}>
                {/*<div className={styles.iconTop}/>*/}
                <div className={`${styles.floatingBoxTop}`}>
                  <div className={`${styles.floatingBottomContent}`}>
                    <div className={`${styles.circleBox}`}/>
                    <div className={`${styles.floatingText}`}>Tell me what makes you perfect for this role</div>
                    <div className={styles.iconsBox}>
                      <ClockIcon className={styles.iconClock}/>
                      <span>30s</span>
                    </div>
                  </div>

                </div>
              </div>
              <div className={styles.imgWrapStatic}/>
              {/*<div className={`${styles.questionBottom}`}>*/}
              {/*  <div className={`${styles.iconBottom}`}/>*/}
              {/*</div>*/}
              <div className={`${styles.questionBottom}`}>
                {/*<div className={`${styles.iconBottom}`}/>*/}
                <div className={`${styles.floatingBoxBottom}`}>
                  <div className={`${styles.floatingBottomContent}`}>
                    <div className={`${styles.circleBox}`}/>
                    <div className={`${styles.floatingText}`}>Introduce yourself in 60 seconds or less</div>
                    <div className={styles.iconsBox}>
                      <ClockIcon className={styles.iconClock}/>
                      <span>30s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*</div>*/}
        </div>
      }

      {/*<button onClick={handleToggleClicked}>Click me!</button>*/}
    </>

  );

};

export default HomeStart;
