import React, {useEffect, useState} from 'react';
import styles from './Header.module.scss'
import Logo from "../UI/icons/Logo";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [blockLinks, setBlockLinks] = useState([
    {
      href: '/',
      text: 'Inspiration'
    },
    {
      href: '/',
      text: 'Integration'
    },
    {
      href: '/',
      text: 'Support'
    },

  ])


  let token = localStorage.getItem('UserID');
  const logoutFn = () => {
    localStorage.clear()
  }

  return (
    <div className={styles.container}>
      <NavLink to={'/'} className={styles.logoLink}><Logo className={styles.logo}/></NavLink>
      <div className={styles.tabBox}>
        {
          blockLinks.map((link, index) =>
            <NavLink
              key={index} className={styles.linkWrap} to={link.href} activeclassname={styles.active}>
              <span className={styles.itemLink}>{link.text}</span>
             </NavLink>
          )
        }
        {!token ?
          <NavLink className={styles.linkWrap}

              onClick={event => {
              if(pathname === '/'){
                // event.stopPropagation();
                event.preventDefault();
                const navigationRef = event.currentTarget.href;
                // console.log(event)
                setTimeout(()=>{
                  navigate('/log-in');
                },400)

              }

            }}

                   to={'/log-in'} activeclassname={styles.active}>
            <span className={styles.itemLink}>Log In</span>
          </NavLink>
          : null}
        {!token ?
          <NavLink className={styles.joinWrap} to={'/sign-up'}    onClick={event => {
            if(pathname === '/'){
              // event.stopPropagation();
              event.preventDefault();
              const navigationRef = event.currentTarget.href;
              // console.log(event)
              setTimeout(()=>{
                navigate('/sign-up');
              },400)

            }

          }} activeclassname={styles.active}>
            <span className={styles.joinLink}>Join</span>
          </NavLink> : <NavLink className={styles.joinWrap} to={'/'} activeclassname={styles.active} onClick={logoutFn}>
            <span className={styles.joinLink}>Logout</span>
          </NavLink>}

      </div>

    </div>
  )
};

export default Header;


//   onClick={event => {
//   if(pathname === '/'){
//     // event.stopPropagation();
//     event.preventDefault();
//     const navigationRef = event.currentTarget.href;
//     // console.log(event)
//     setTimeout(()=>{
//       navigate('/log-in');
//     },400)
//
//   }
//
// }}