import React, { FC } from 'react';
// @ts-ignore
import styles from './CarouselItem.module.scss'
import cn from 'classnames';
import { CarouselDataType } from '../../../types/CarouselDataType';

interface Props {
  member: CarouselDataType;
}

const CarouselItem: FC<Props> = ({member}: Props) => {
  return (
    <div className={styles.itemWrap}>
      <div className={styles.contentRow}>
        <div className={styles.imgCol}>
          <div className={cn(styles.coverPhoto, styles[member?.class])}/>
        </div>
        <div className={styles.textCol}>
          <div className={cn(styles.text, {[styles.bigText]: member?.isBig})}>{member?.description}</div>
          <div className={styles.userName}><strong>{member?.name}</strong><br/>{member?.job}</div>
        </div>
      </div>
    </div>
  )
};

export default CarouselItem;
