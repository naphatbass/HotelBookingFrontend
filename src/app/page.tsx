import Image from "next/image";
import styles from "./page.module.css";

import Banner from "@/components/Banner";
import Card from "@/components/Card";
import CardPanel from "@/components/CardPannel";

export default function Home() {
  return (
    <main className={styles.main}>
      <Banner />
      <div style={{display:"flex",justifyItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"2rem"}}>
        <CardPanel />
        {/* <Card vanueName="The Bloom Pavilion" imgSrc="/img/bloom.jpg" />
        <Card vanueName="Spark Space" imgSrc="/img/sparkspace.jpg" />
        <Card vanueName="The Grand Table" imgSrc="/img/grandtable.jpg" /> */}
      </div>
    </main>
  );
}
