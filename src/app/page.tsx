import Image from "next/image";
import styles from "./page.module.css";

import Banner from "@/components/Banner";
import CardPanel from "@/components/CardPanel";

export default function Home() {
  return (
    <main className={styles.main}>
      <Banner />
      <div style={{display:"flex",justifyItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"2rem"}}>
        <CardPanel />
      </div>
    </main>
  );
}
