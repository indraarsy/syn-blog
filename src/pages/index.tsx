import Image from "next/image";
import { Inter } from "next/font/google";
import { trpc } from "@/utils/trpc";
import Link from "next/link"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] });

type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export default function Home() {
  const [curPage, setCurPage] = useState<number>(1)

  const { data } = trpc.getAllPosts.useQuery<Post[]>({
    page: curPage
  });

  return (
    <>
      <title>{curPage === 0 ? "Blogs" : `Blogs Page ${curPage}`}</title>
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-0 md:px-24`}
      >
        <div className="mx-auto max-w-2xl min-h-screen lg:max-w-5xl dark:bg-zinc-900 p-12 w-full">
          <header className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">Writing about software development and random things</h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">A lot of night thoughts are written here.</p>
          </header>
          <div className="mb-0 grid pt-8 lg:max-w-5xl gap-4 lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left">
            {data && data.map((item, index) => (
            <Link
              key={item.id}
              href={`/blogs/${item.id}`}
              className="group rounded-lg border border-neutral-700 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {item.title}
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {`${item.body.substring(1,30)}...`}
              </p>
            </Link>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              disabled={curPage === 1}
              className="border border-neutral-700 rounded-lg p-4 disabled:text-gray-500 disabled:hover:cursor-not-allowed"
              onClick={() => {
                setCurPage((prev) => prev - 1)
              }}
            >
              Prev
            </button>
            <button 
              className="border border-neutral-700 rounded-lg p-4"
              onClick={() => {
                setCurPage((prev) => prev + 1)
              }}
            >
              Next
            </button>
          </div>
        </div> 
      </main>
    </>
  );
}
