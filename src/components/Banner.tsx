import styles from './banner.module.css';
import Image from 'next/image';

export default function Banner() {
  return (
    <div className={styles.banner}>
      <Image src={'/img/banner.jpg'} 
      alt="Banner" 
      layout="fill" 
      objectFit="cover" />
      <div className={styles.bannerText}>
        <h1>where every event finds its venue</h1>
        <p>Find perfect place for connecting people here!</p>
    </div>
    </div>
  );
}
