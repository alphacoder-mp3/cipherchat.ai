import { resend } from '@/lib/resend';
import VerificationEmail from '@/emails/VerificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'cipherchat.ai | verification code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: 'Verification message sent successfully' };
  } catch (emailErr) {
    console.log('Error sending verification email', emailErr);
    return { success: false, message: 'failed to send verification message' };
  }
}
