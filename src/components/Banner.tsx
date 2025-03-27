'use client';
import styles from './banner.module.css';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Banner() {

  const { data: session } = useSession();
  console.log(session?.user?.token);
  
  return (
    <div className={styles.banner}>
      <Image src={'/img/banner.jpg'} 
      alt="Banner" 
      layout="fill" 
      objectFit="cover" />
      <div className={styles.bannerText}>
        <h1>Premium Luxury Hotels</h1>
        <p>Find perfect place for your vacation!</p>
    </div>
    </div>
  );
}
