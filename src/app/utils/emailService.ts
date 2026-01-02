// Email Service - Connected to Backend API with Resend
// Backend handles email sending with auto-reply functionality

import { env, getApiUrl } from './env';

interface EmailData {
  name: string;
  email: string;
  service: string;
  message: string;
}

/**
 * Send contact form email via backend API
 * Backend uses Resend to send:
 * 1. Notification email to site owner
 * 2. Auto-reply email to user
 */
export const sendContactEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Check if email is enabled
    if (!env.enableEmail) {
      console.log('📧 Email sending is disabled in configuration');
      return {
        success: true,
        message: 'Wiadomość zapisana (email wyłączony w konfiguracji)',
      };
    }
    
    console.log('📧 Sending email via backend:', data);
    console.log('📧 API Endpoint:', getApiUrl(env.apiSendEmailEndpoint));
    
    // Call backend API
    const response = await fetch(getApiUrl(env.apiSendEmailEndpoint), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    // Parse response
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }
    
    console.log('✅ Email sent successfully:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    // User-friendly error messages
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return {
        success: false,
        message: 'Nie można połączyć się z serwerem. Sprawdź czy backend działa.',
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.',
    };
  }
};

/**
 * Send auto-reply email to user
 * This is now handled automatically by the backend
 */
export const sendAutoReplyEmail = async (userEmail: string, userName: string): Promise<void> => {
  console.log(`📧 Auto-reply will be sent by backend to ${userEmail}`);
  // Backend handles this automatically when sendContactEmail is called
};