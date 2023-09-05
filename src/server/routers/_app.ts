import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  getAllPosts: procedure
    .input(
      z.object({
        page: z.number()
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      const page = input.page

      const fetchPosts = await fetch(`https://gorest.co.in/public/v2/posts${page === 1 ? "" : `?page=${page}`}`);
      return fetchPosts.json();
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
