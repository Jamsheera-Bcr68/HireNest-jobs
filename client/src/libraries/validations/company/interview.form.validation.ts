import { z } from "zod";

export const interviewSchema = z
  .object({
    mode: z.enum(["online", "offline"]),

    date: z
      .string()
      .min(1, "Date is required"),

    time: z
      .string()
      .min(1, "Time is required"),

    duration: z
      .string()
      .min(1, "Duration is required"),

    isAddlinkLater: z.boolean(),

    meetlink: z
      .string()
      .url("Enter a valid meeting link")
      .optional()
      .or(z.literal("")),

    location: z.string().optional(),

    notes: z.string().max(500, "Notes too long").optional(),
  })

  .superRefine((data, ctx) => {
    // If online interview AND link not added later → meeting link required
    if (
      data.mode === "online" &&
      !data.isAddlinkLater &&
      !data.meetlink
    ) {
      ctx.addIssue({
        path: ["meetlink"],
        code: z.ZodIssueCode.custom,
        message: "Meeting link is required",
      });
    }

    // If offline interview → location required
    if (data.mode === "offline" && !data.location) {
      ctx.addIssue({
        path: ["location"],
        code: z.ZodIssueCode.custom,
        message: "Location is required",
      });
    }
  });

  export type interviewFormType=z.infer<typeof interviewSchema>