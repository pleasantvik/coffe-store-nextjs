import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function CoffeStore() {
  const router = useRouter();
  const { id } = router.query;
  console.log(router);
  return (
    <div>
      CoffeStore: {id}
      <Link
        href="/"
        className="font-medium uppercase text-sm bg-blue-700 px-5 py-3 text-white"
      >
        &larr; Back to home
      </Link>
      <Link
        href="/coffee-store/dynamic"
        className="font-medium uppercase text-sm bg-blue-700 px-5 py-3 text-white"
      >
        &larr; Dynamic
      </Link>
    </div>
  );
}
