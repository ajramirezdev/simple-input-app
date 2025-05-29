import { prisma } from "../prisma";
import { deleteSubmissionSchema, submissionSchema } from "../schema";
import { publicProcedure, router } from "../trpc";

export const inputRouter = router({
  submit: publicProcedure
    .input(submissionSchema)
    .mutation(async ({ input }) => {
      const submission = await prisma.submission.create({
        data: { text: input.text },
      });
      return submission;
    }),

  list: publicProcedure.query(async () => {
    return prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  delete: publicProcedure
    .input(deleteSubmissionSchema)
    .mutation(async ({ input }) => {
      await prisma.submission.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});
