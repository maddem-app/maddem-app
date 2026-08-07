import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <Image
        src="/images/splash/splash.png"
        alt="MADdeM Splash"
        fill
        priority
        className="object-cover"
      />
    </main>
  );
}