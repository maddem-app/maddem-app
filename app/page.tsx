"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/estado";
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <Image
        src="/images/splash/splash.png"
        alt="MADdeM"
        fill
        priority
        className="object-cover"
      />
    </main>
  );
}