import { z } from 'zod';

export const usernameSchema = z
  .string()
  .min(2, 'Username should be at least 2 characters')
  .max(15, 'Username should not be more than 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username should not contain special character');

export const signUpSchema = z.object({
  username: usernameSchema,
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'password must be at least 6 characters' }),
});
