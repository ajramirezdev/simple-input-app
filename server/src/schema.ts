import { z } from "zod";

export const submissionSchema = z.object({
  text: z.string().min(1).max(255),
});

export const deleteSubmissionSchema = z.object({
  id: z.number().int().positive(),
});
