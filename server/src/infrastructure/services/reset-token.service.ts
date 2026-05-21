import crypto from 'crypto';

export const passwordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  return { resetToken, hashedToken };
};
export const hashedToken = (token: string) => {
  const hashToken = crypto.createHash('sha256').update(token).digest('hex');
  return hashToken;
};
