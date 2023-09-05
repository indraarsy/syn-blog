import React from 'react'
import type { GetServerSideProps } from 'next'
import Link from "next/link"

type Props = {
  meta: {
    title: string;
  }
  post: {
    id: number;
    user_id: number;
    title: string;
    body: string;
  }
  comments: {
    id: number;
    post_id: number;
    name: string;
    email: string;
    body: string;
  }[]
}

type Query = {
  idPost: number
}

const BlogsDetails = (props: Props) => {
  return(
    <>
      <title>{props.post.title}</title>
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-0 md:px-24 relative`}
      >
        <div className="mx-auto max-w-2xl min-h-screen lg:max-w-5xl dark:bg-zinc-900 p-12 w-full">
          <header className="max-w-2xl">
            <Link
              href="/"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="white" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"/></svg>
            </Link>
            <h1 className="text-4xl mt-8 font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">{props.post.title}</h1>
          </header>
          <div className="mb-32 grid pt-8 lg:max-w-5xl gap-4 lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left">
            <p className="mt-8 break-words prose dark:prose-invert text-zinc-400">{props.post.body}</p>
            {props.comments.length > 0 && (
              <>
                <h3 className="mt-6">Comments: </h3>
                {props.comments.map((item, index) => (
                  <div key={index}>
                    <p>{item.name}</p>
                    <p className="text-zinc-400">{item.body}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div> 
      </main>
    </>
  )
}

export default BlogsDetails

export const getServerSideProps: GetServerSideProps = async ({query}) => {

  const urlPost = await fetch(`https://gorest.co.in/public/v2/posts/${query.id}`)
  const postResponse = await urlPost.json()

  const commentPost = await fetch(`https://gorest.co.in/public/v2/posts/${query.id}/comments`)
  const commentResponse = await commentPost.json()

  return { 
    props: { 
      meta: {
        title: `Post ${query.id}`
      },
      post: postResponse,
      comments: commentResponse
    }
  }
}
