import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({
  searchIssues: publicProcedure
    .input(
      z.object({
        q: z.string(),
        language: z.string(),
      }),
    )
    .query(async ({ input: { q, language } }) => {
      return await axios
        .get(
          `https://api.github.com/search/issues?q=${q}+label:%22good%20first%20issue%22+language:${language}+state:open&sort=interactions&order=desc`,
        )
        .then((data) => data.data as IssueResponse);
    }),
});
