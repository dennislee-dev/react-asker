import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import RightScreen from "../../../container/RightScreen/RightScreen";
import TabMenu from "../../TabMenu/TabMenu";
import styles from './Layout.module.scss'
import AccountSettings from "../../../container/AccountSettings/AccountSettings";
import Header from "../../Header/Header";
// import BurgerHeader from "../../BurgerHeader/BurgerHeader";
import {ReactComponent as BurgerMenu} from '../../../image/svg/burger-menu.svg';
import BurgerHeader from "../../BurgerHeader/BurgerHeader";
import Settings from "../../../container/Settings/Settings";

const Layout = ({children}) => {
  const {pathname} = useLocation();
  const [smallView, setSmallView] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const user = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    const hideSettingsToggle = (e) => {
      const path = e.path || (e.composedPath && e.composedPath())
      const settingsEl = document.getElementById('settings');
      const tabMenuEl = document.getElementById('tabMenu');
      console.log(tabMenuEl);
      if (!path.includes(settingsEl) && !path.includes(tabMenuEl)) {
        setShowSettings(false)
      }
    }
    if(showSettings){
      window.addEventListener('click', hideSettingsToggle)
    }
    return () => window.removeEventListener('click', hideSettingsToggle)

  }, [showSettings])


  const onClick = (buttonName) => {
    setShowSettings(buttonName === 'settings')
  };

  useEffect(() => {
    if (pathname === '/'
      // || pathname === '/log-in'
      // || pathname === '/sign-up'
    ) {
      setSmallView(true)
    } else {
      setSmallView(false)
    }
  }, [pathname])

  // console.log('pathname', pathname, pathname === '/log-in', smallView);

  return (
    <>
      <BurgerHeader pageWrapId={"page-wrap"} outerContainerId={"outer-container"} customBurgerIcon={<BurgerMenu/>} right/>
      <div className={`container ${styles.mainContainer}`} id={"page-wrap"}>
        <div className={styles.mainWrapper}>
          <div className={ `${styles.headerBlock} ${pathname === '/dashboard' ? styles.dashboardHeaderTablet : ''}`}>
            <Header />
          </div>

          <div className={`${styles.mainRow} ${pathname === '/dashboard' ? styles.dashboardMainRow : ''}`}>
            <div className={`${styles.mainCol} ${pathname === '/dashboard' ? styles.dashboardMainCol : ''} ${!smallView ? styles.scaleUpHorLeft : null} ${smallView ? styles.mainColSmall : null}`}>
              <div className={styles.contentWrapper}>
                {children}

                {!smallView && user ?
                  <TabMenu onClick={onClick} setShowSettings={setShowSettings} showSettings={showSettings}/>
                  // <TabMenu onClick={onClick}/>
                  : null}
                <Settings setShowSettings={setShowSettings} showSettings={showSettings}/>
                {/*<div className={`blur-back ${isSettingsActive && 'blur-back_active'}`}/>*/}
                {/*<div className={`modalWindow ${isSettingsActive && 'modalWindow_active'}`}>*/}
                {/*  <AccountSettings isActive={isSettingsActive}/>*/}
                {/*</div>*/}
              </div>
            </div>
            <div className={`${styles.staticCol} ${pathname === '/dashboard' ? styles.dashboardStaticCol : ''} ${!smallView ? styles.scaleUpHorRight : null}  ${smallView ? styles.staticColSmall : styles.staticCol}`}

              //      onClick={()=>{
              //   if(showSettings){
              //     setShowSettings(false)
              //   }
              // }}
            >
              <RightScreen/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
export default Layout;
