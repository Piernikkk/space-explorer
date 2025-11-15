import Link from "next/link";
import StarryBackground from "./components/StarryBackground";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen min-w-screen overflow-hidden">
      <StarryBackground />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <div className="max-w-4xl text-center">
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-white md:text-8xl">Space Explorer</h1>

          <p className="mb-12 text-xl text-gray-300 md:text-2xl">
            Journey through the cosmos and discover the wonders of the universe
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size={"xl"}>Start Exploring</Button>

            <Link href={"https://github.com/Piernikkk/space-explorer"} target="_blank">
              <Button size={"xl"} variant={"secondary"}>
                View on Github
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
