import { Resend } from 'resend';
import VerifyEmail from '../../emailTemplate/emailTemplate';
import { apiResponse } from '@/types/apiResponse';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email: string, username: string, verificationCode: number) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Verification code to verify Anonymous Feed account',
            react: VerifyEmail({ username, verificationCode }),
        });

        if (error) {
            return {
                success: false,
                message: error
            };
        }

        return {
            success: true,
            message: "Verification code was sent successfully"
        };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to send Verification code"
        };
    }
}