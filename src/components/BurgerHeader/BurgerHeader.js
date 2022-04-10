import React, {useState} from 'react';
import {slide as Menu} from 'react-burger-menu'
import styles from './BurgerHeader.module.scss'
import {NavLink} from "react-router-dom";


const BurgerHeader = (props) => {
  const [isOpen, setOpen] = useState(false)
  const blockLinks = [
    {
      href: '/',
      text: 'Inspiration'
    },
    {
      href: '/integration',
      text: 'Integration'
    },
    {
      href: '/support',
      text: 'Support'
    },
    {
      href: '/log-in',
      text: 'Log In'
    },
  ]


  const handleIsOpen = () => {
    setOpen(!isOpen)
  }

  const closeSideBar = () => {
    setOpen(false)
  }
  let token = localStorage.getItem('UserID');
  const logoutFn = () => {
    localStorage.clear()
    closeSideBar()
  }
  return (
    <Menu {...props} height={'100%'} className={styles.burgerMenu} isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
      <div className={styles.containerBurgerMenu}>
        <div
          className={styles.tabBoxBurgerMenu}>
          {
            blockLinks.map((link, index) =>
              <NavLink key={index} className={styles.linkWrapBurgerMenu} to={link.href} activeclassname={styles.active} onClick={() => closeSideBar()}>
                <span className={styles.itemLinkBurgerMenu}>{link.text}</span>
              </NavLink>
            )
          }
          {!token ? <NavLink className={styles.joinWrapBurgerMenu} to={'/sign-up'} activeclassname={styles.active}>
            <span className={styles.joinLinkBurgerMenu}>Join</span>
          </NavLink> : <NavLink className={styles.joinWrapBurgerMenu} to={'/logout'} activeclassname={styles.active} onClick={logoutFn}>
            <span className={styles.joinLinkBurgerMenu}>Logout</span>
          </NavLink>}
        </div>
      </div>

    </Menu>
  )
};

export default BurgerHeader;
