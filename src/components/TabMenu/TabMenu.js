import React, {useEffect, useState} from 'react';
import styles from './TabMenu.module.scss'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import TabWatch from "../UI/icons/TabMenu/TabWatch";
import TabAsk from "../UI/icons/TabMenu/TabAsk";
import TabAnswer from "../UI/icons/TabMenu/TabAnswer";
import TabSettings from "../UI/icons/TabMenu/TabSettings";
import {getQueryParams} from "../../utils/helpers";

const TabMenu = (props) => {
  const {pathname} = useLocation();
  const [askTabActive, setAskTabActive] = useState(false);
  const [watchTabActive, setWatchTabActive] = useState(false);
  const [answerTabActive, setAnswerTabActive] = useState(false);
  // const [askSettingsActive, setSettingsTabActive] = useState(false);

  const {search} = useLocation();
  // const targetUrl = getQueryParams(search);
  // let navigate = useNavigate();
  // let url = window.location.href.split('/').slice(-1)[0]

  const toggleSettings = () => {
    // navigate(`/${url}&settings`)
    props.onClick('settings')
    props.setShowSettings(!props.showSettings)
  }

  useEffect(() => {
    if (pathname === '/create-asker'
      || pathname === '/share-asker'
      || pathname === '/dashboard'
      || pathname === '/edit-asker'
      || pathname === '/view-asker') {

      setAskTabActive(true)
      setAnswerTabActive(false);
      setWatchTabActive(false);
    }

    if (pathname === '/answer'
      || pathname === '/asker-search'
      || pathname === '/start-asker'
      || pathname === '/next-question'
      || pathname === '/record-again'
      || pathname === '/progress'
      || pathname === '/asker-complete'
      ) {
      setAnswerTabActive(true);
      setAskTabActive(false);
      setWatchTabActive(false);
    }

    if (pathname === '/contact-card'
      || pathname === '/watch-answer'
      || pathname === '/all-answers'
      ) {
      setWatchTabActive(true)
      setAskTabActive(false)
      setAnswerTabActive(false);
    }
  }, [pathname])

  // console.log('props.showSettings', props.showSettings);


  return (
    <div className={styles.tabContainerWrap} >
      <div className={styles.tabContainer} id={'tabMenu'}>
        <div className={styles.tabContainerSecondary}>
          <NavLink onClick={() => {
            props.onClick('watch')
          }
          } to={'/all-answers'} className={({isActive}) => (`${styles.tabItem} ${  watchTabActive  ? styles.activeTab : ''} `)}>
            <TabWatch className={`${styles.taIcon}`}/>
            <span>Watch</span>
          </NavLink>
          <NavLink to={'/dashboard'} onClick={() => {props.onClick('ask')}} className={({isActive}) => (`${styles.tabItem} ${askTabActive ? styles.activeTab : ''}`)}>
            <TabAsk  className={`${styles.taIcon}`}/>
            <span>Ask</span>
          </NavLink>
          <NavLink onClick={() => {props.onClick('search')
          }} to={'/asker-search'} className={({isActive}) => (`${styles.tabItem} ${answerTabActive  ? styles.activeTab : ''} `)}>
            <TabAnswer className={`${styles.taIcon}`}/>
            <span>Answer</span>
          </NavLink>
          <button type='button' onClick={() => toggleSettings()}
                  className={`${styles.tabItem} ${!!props.showSettings ? styles.activeTab : ''}`} >
            <TabSettings className={`${styles.taIcon} `}/>
            <span>Settings</span>
          </button></div>


      </div>
    </div>
  )
};

export default TabMenu;
