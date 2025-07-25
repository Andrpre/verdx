import { z } from "zod";

const MESSAGE_VALIDATION = "Поле обязательно для заполнения";

export const disputeFormSchema = z.object({
  topicDispute: z.string().min(1, { message: MESSAGE_VALIDATION }),
  descriptionDispute: z.string().min(1, { message: MESSAGE_VALIDATION }),
  argumentDispute: z.string().min(1, { message: MESSAGE_VALIDATION }),
});

export type DisputeFormValues = z.infer<typeof disputeFormSchema>;
