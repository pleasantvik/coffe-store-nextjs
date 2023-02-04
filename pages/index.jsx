import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Banner } from "@/components/Banner";
import { Card } from "@/components/Card";
import coffestore from "@/data/coffee-stores.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ coffestore }) {
  const handleOnButtonClick = () => {
    console.log("buttonClick");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Shop</title>
        <meta
          name="description"
          content="Get the nearest coffee shop location"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnButtonClick}
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="logo"
          />
          <div className={styles.cardLayout}>
            {coffestore.map((item) => (
              <Card
                name={item.name}
                imgUrl={item.imgUrl}
                href={`/coffee-store/${item.id}`}
                className={styles.card}
                alt={item.name}
                key={item.id}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      coffestore,
    },
  };
};
