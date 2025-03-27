import Image from 'next/image';
import styles from './topmenu.module.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import getUserProfile from '@/libs/getUserProfile';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);
    let profile = null;

    if (session) {
        profile = await getUserProfile(session.user?.token);
    }

    return (
        <div className={styles.topmenu}>
            <Link href="./" className="text-3xl tracking-wide">5th Aloha</Link>
            <div className="flex flex-row items-center space-x-8">
                {session ? (
                    <>
                        <a className="text-lg">Hello {session.user?.name}</a>
                        {profile?.data?.role !== 'admin' ? (
                            <Link href="./booking" className="text-lg">Booking</Link>
                        ) : (
                            null
                        )}
                        <Link href="./manage" className="text-lg">Manage</Link>
                        <Link href="/api/auth/signout" className="text-lg">Sign-Out</Link>
                    </>
                ) : (
                    <Link href="/api/auth/signin" className="text-lg">Sign-In</Link>
                )}
                <Image src="/img/logo.png" alt="logo" width={75} height={75} />
            </div>
        </div>
    );
}
