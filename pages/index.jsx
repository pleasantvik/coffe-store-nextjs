import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Banner } from "@/components/Banner";
import { Card } from "@/components/Card";
import { Fragment } from "react";
import {
  fetchCoffeeStore,
  getListOfCoffeeStorePhotos,
} from "@/lib/coffee-store";

import coffee from "../data/foursquare-api-data.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ coffeStore, images }) {
  console.log(images, "unsplash");
  // console.log(coffeStore);
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
        </div>
        {coffeStore.length > 0 && (
          <Fragment>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {coffeStore.map((item) => (
                <Card
                  name={item.name}
                  imgUrl={
                    "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
                  }
                  href={`/coffee-store/${item.fsq_id}`}
                  className={styles.card}
                  alt={item.name}
                  key={item.fsq_id}
                />
              ))}
            </div>
          </Fragment>
        )}
      </main>
    </div>
  );
}
// export const getStaticPaths = async () => {};

export const getStaticProps = async () => {
  // const coffeStore = await fetchCoffeeStore();
  const coffeStore = coffee.results;
  const img = await getListOfCoffeeStorePhotos();

  console.log(img);

  return {
    props: {
      coffeStore,
      images: img,
    },
  };
};
