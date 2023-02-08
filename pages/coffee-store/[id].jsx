import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStore } from "@/lib/coffee-store";

export default function CoffeStore({ coffeestore }) {
  console.log(coffeestore, "4Q");
  const router = useRouter();
  const [vote, setVote] = useState(0);

  const handleUpvote = () => {
    setVote(vote + 1);
  };
  console.log(router);
  if (router.isFallback) {
    return <h1>Loading</h1>;
  }
  const { name, imgUrl, location } = coffeestore;
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link
              href="/"
              className="font-medium uppercase text-sm bg-blue-700 px-5 py-3 text-white"
            >
              &larr; Back to home
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width={24} height={24} />
            <p className={styles.text}>{location?.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width={24} height={24} />
            <p className={styles.text}>{location?.cross_street}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width={24} height={24} />
            <p className={styles.text}>{vote}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvote}>
            upVote
          </button>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const coffeeStore = await fetchCoffeeStore();

  return {
    paths: coffeeStore.map((item) => ({
      params: { id: item.fsq_id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (staticProps) => {
  const params = staticProps.params;
  const coffeeStore = await fetchCoffeeStore();

  // console.log(params.query, "params");
  return {
    props: {
      coffeestore: coffeeStore.find(
        (coffeestore) => coffeestore.fsq_id.toString() === params.id
      ),
    },
  };
};

//fsq3EjmePfHh9ikaluJP9OO2DkBe5iNKR/U6Jmpd3IUbM6k=
