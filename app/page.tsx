import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-24 py-16">
      <h1 className="text-xl font-semibold w-1/3 text-center mx-auto my-20">
        Create your own wallet with multiple accounts, view balances, do
        transactions and much more.
      </h1>
      <Link href="/wallet">
        <Button>Create Wallet</Button>
      </Link>
    </main>
  );
}
