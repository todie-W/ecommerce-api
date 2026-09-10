import { z } from 'zod/v4';

const userSchema = z.strictObject({
  name: z.string().min(1, 'First name is required'),
  email: z.email('Invalid email.'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export { userSchema };