import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import coffeeStoreData from "@/data/coffee-stores.json";
import Head from "next/head";
import styles from "@/styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";

export default function CoffeStore({ coffeestore }) {
  const router = useRouter();
  const [vote, setVote] = useState(0);

  const handleUpvote = () => {
    setVote(vote + 1);
  };
  console.log(router);
  if (router.isFallback) {
    return <h1>Loading</h1>;
  }
  const { name, address, neighbourhood, imgUrl } = coffeestore;
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
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width={24} height={24} />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width={24} height={24} />
            <p className={styles.text}>{neighbourhood}</p>
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
  return {
    paths: coffeeStoreData.map((item) => ({
      params: { id: item.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (staticProps) => {
  const params = staticProps.params;
  // console.log(params.query, "params");
  return {
    props: {
      coffeestore: coffeeStoreData.find(
        (coffeestore) => coffeestore.id.toString() === params.id
      ),
    },
  };
};
