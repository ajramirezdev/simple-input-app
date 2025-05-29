import { router } from "../trpc";
import { inputRouter } from "./inputRouter";

export const appRouter = router({
  input: inputRouter,
});

export type AppRouter = typeof appRouter;
