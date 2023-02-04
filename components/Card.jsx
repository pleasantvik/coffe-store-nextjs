import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./card.module.css";
import cls from "classnames";

export const Card = ({ name, imgUrl, href }) => {
  return (
    <Link href={href} className={styles.cardLink}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            src={imgUrl}
            height={160}
            width={260}
            className={styles.cardImage}
          />
        </div>
      </div>
    </Link>
  );
};
