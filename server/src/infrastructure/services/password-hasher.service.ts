import bcrypt from 'bcryptjs';

export const hashedPassword = async (plain: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(plain, saltRounds);
};
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
