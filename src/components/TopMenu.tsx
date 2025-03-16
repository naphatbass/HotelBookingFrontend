import Image from 'next/image';
import styles from './topmenu.module.css';

export default function TopMenu() {
    return (
        <div className={styles.topmenu}>
            <h1 className="text-3xl tracking-wide">5th A-Vanue</h1>
            <div className="flex flex-row items-center space-x-8">
                {/* <a href="./" className="text-lg">Home</a> */}
                <a href="./booking" className="text-lg">Booking</a>
                <Image src="/img/logo.png" alt="logo" width={75} height={75} />
            </div>
        </div>
    );
}
