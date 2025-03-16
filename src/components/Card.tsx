"use client";

import styles from './card.module.css';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';
import { useState } from 'react';

export default function Card({ vanueName, imgSrc, onRatingChange }: { vanueName: string, imgSrc: string, onRatingChange: Function }) {
    const [ratingValue, setRatingValue] = useState<number | null>(0);

    const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        setRatingValue(newValue); // Update the local rating state
        onRatingChange(vanueName, newValue?.toString() || "0"); // Pass the rating to parent component
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
                    <h2 className='text-lg'>{vanueName}</h2>
                    <p className='text-sm'>{vanueName}</p>
                    <p className='text-transparent'>The Bloom Pavilion</p>
                    <p className='text-xs'>Exclusive place available for your greatest memory</p>
                    <div className='pt-5'>
                        <Rating
                            value={ratingValue}
                            onChange={handleRatingChange}
                        />
                    </div>
                </div>
            </div>
        </InteractiveCard>
    )
}

