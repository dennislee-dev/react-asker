import styles from './AccountSettings.module.scss';
import React, {useEffect, useRef, useState} from 'react';


const AccountSettings = ({isActive}) => {
  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.settingsTitle}>
        <div className={styles.settingsTitle__icon}/>
        <h6>Account Settings</h6>
      </div>
      <div className={`${styles.card} ${styles.accountWrapper}`}>
        <div className={styles.accountIcon}/>
        <div className={styles.accountInfo}>
          <div className={styles.option}>
            <div className={styles.option__icon}/>
            <div className={styles.option__info}>
              <span className={styles.option__info__title}>Name</span>
              <span className={styles.option__info__text}>Antonio Pérez</span>
            </div>
          </div>
          <div className={styles.option}>
            <div className={styles.option__icon}/>
            <div className={styles.option__info}>
              <span className={styles.option__info__title}>Email</span>
              <span className={styles.option__info__text}>antonio.p@gmail.com</span>
            </div>
          </div>
          <div className={styles.option}>
            <div className={styles.option__icon}/>
            <div className={styles.option__info}>
              <span className={styles.option__info__title}>Password</span>
              <span className={styles.option__info__text}>updated 2 weeks ago</span>
            </div>
          </div>
          <div className={styles.option}>
            <div className={styles.option__icon}/>
            <div className={styles.option__info}>
              <span className={styles.option__info__title}>Phone number</span>
              <span className={styles.option__info__text}>07432932937</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.card} ${styles.functionalityWrapper}`}>
        <div className={styles.option}>
          <div className={styles.option__icon}/>
          <div className={styles.option__info}>
            <span className={styles.option__info__title}>Notifications</span>
            <span className={styles.option__info__text}>Keep updated</span>
          </div>
        </div>
        <div className={`${styles.option} ${styles.option_disabled}`}>
          <div className={styles.option__icon}/>
          <div className={styles.option__info}>
            <span className={styles.option__info__title}>Collaborate </span>
            <span className={styles.option__info__text}>For your teams</span>
          </div>
          <i className={styles.arrow}/>
        </div>
        <div className={`${styles.option} ${styles.option_disabled}`}>
          <div className={styles.option__icon}/>
          <div className={styles.option__info}>
            <span className={styles.option__info__title}>API & Integration</span>
            <span className={styles.option__info__text}>For your workflow</span>
          </div>
          <i className={styles.arrow}/>
        </div>
      </div>
      <div className={`${styles.card} ${styles.someComponent}`}/>
    </div>
  )
}

export default AccountSettings;
