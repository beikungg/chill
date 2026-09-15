'use server';

import { websiteConfig } from '@/config/website';
import { sendEmail } from '@/mail';
import { getLocale } from 'next-intl/server';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

// Create a safe action client
const actionClient = createSafeActionClient();

/**
 * DOC: When using Zod for validation, how can I localize error messages?
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#server-actions
 */
/**
 * Enquiry categories offered on the contact form. Kept as a literal union so
 * an unexpected value is rejected server-side rather than forwarded into email.
 */
const ENQUIRY_TYPES = [
  'recruitment',
  'executiveSearch',
  'hrConsulting',
  'other',
] as const;

// Contact form schema for validation
const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(30, { message: 'Name must not exceed 30 characters' }),
  company: z
    .string()
    .min(2, { message: 'Company must be at least 2 characters' })
    .max(80, { message: 'Company must not exceed 80 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z
    .string()
    .max(40, { message: 'Phone must not exceed 40 characters' })
    .optional()
    .or(z.literal('')),
  enquiryType: z.enum(ENQUIRY_TYPES, {
    message: 'Please select the type of enquiry',
  }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(500, { message: 'Message must not exceed 500 characters' }),
  /**
   * GDPR consent. Validated here as well as in the browser on purpose: consent
   * is the legal basis for processing this enquiry (Art. 6 (1) (a) GDPR), so a
   * request that bypasses the client-side check must still be refused.
   */
  consent: z.literal(true, {
    message: 'Consent to the privacy policy is required',
  }),
});

// Create a safe action for contact form submission
export const sendMessageAction = actionClient
  .schema(contactFormSchema)
  .action(async ({ parsedInput }) => {
    // Do not check if the user is authenticated here
    try {
      const { name, email, message } = parsedInput;

      if (!websiteConfig.mail.supportEmail) {
        console.error('The mail receiver is not set');
        throw new Error('The mail receiver is not set');
      }

      const locale = await getLocale();

      // Send message as an email to admin
      const result = await sendEmail({
        to: websiteConfig.mail.supportEmail,
        template: 'contactMessage',
        context: {
          name,
          email,
          message,
        },
        locale,
      });

      if (!result) {
        console.error('send message error');
        return {
          success: false,
          error: 'Failed to send the message',
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error('send message error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Something went wrong',
      };
    }
  });
