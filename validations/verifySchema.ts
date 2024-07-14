import { z } from 'zod';

export const verifySchema = z.object({
  code: z.string().length(10, 'Verification code must be 10 digits'),
});
