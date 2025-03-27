"use client";

import styles from './card.module.css';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';
import { useState } from 'react';

export default function Card({ hotelName, address, district, province, tel, imgSrc }: { hotelName: string, address : string, district : string, province : string, tel : string, imgSrc: string }) {
    const [ratingValue, setRatingValue] = useState<number | null>(0);

    const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        setRatingValue(newValue);
    };

    return(
        <InteractiveCard>
            <div className={styles.card}>
                <div className={styles.cardimg}>
                    <Image src={imgSrc}
                    alt="card image"
                    layout="fill"
                    objectFit="cover" />
                </div>
                <div className={styles.cardtext}>
                    <h2 className='text-lg'>{hotelName}</h2>
                    <p className='text-sm pt-1'>{address} {district} {province}</p>
                    <p className='text-xs pt-1'>{tel}</p>
                    <div className='pt-5'>
                        {/* <Rating
                            value={ratingValue}
                            onChange={handleRatingChange}
                            id={'{hotelName} Rating'}
                        /> */}
                    </div>
                </div>
            </div>
        </InteractiveCard>
    )
}

