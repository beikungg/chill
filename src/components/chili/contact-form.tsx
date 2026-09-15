'use client';

import { sendMessageAction } from '@/actions/send-message';
import { FormError } from '@/components/shared/form-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const ENQUIRY_TYPES = [
  'recruitment',
  'executiveSearch',
  'hrConsulting',
  'other',
] as const;

/**
 * Chili Career enquiry form — docs/design-spec.md §5.3.
 *
 * Fields are kept to what is actually needed to answer an enquiry, which is
 * both better design and GDPR data minimisation.
 *
 * The consent checkbox is unticked by default and required to submit; its label
 * carries an inline link to the Datenschutz page. Consent is the legal basis for
 * processing (Art. 6 (1) (a) GDPR), so the server action validates it too — see
 * src/actions/send-message.ts.
 */
export function ChiliContactForm() {
  const t = useTranslations('ChiliCareer.form');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');

  const formSchema = z.object({
    name: z.string().min(3, t('nameMin')).max(30, t('nameMax')),
    company: z.string().min(2, t('companyMin')).max(80, t('companyMax')),
    email: z.string().email(t('emailInvalid')),
    phone: z.string().max(40, t('phoneMax')).optional().or(z.literal('')),
    enquiryType: z.enum(ENQUIRY_TYPES, { message: t('enquiryRequired') }),
    message: z.string().min(10, t('messageMin')).max(500, t('messageMax')),
    consent: z.literal(true, { message: t('consentRequired') }),
  });

  type Values = z.infer<typeof formSchema>;

  const form = useForm<Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      // Deliberately no default for enquiryType, and consent starts false:
      // pre-ticked consent is not consent.
      consent: false as unknown as true,
    },
  });

  const onSubmit = (values: Values) => {
    startTransition(async () => {
      try {
        setError('');
        const result = await sendMessageAction(values);

        if (result?.data?.success) {
          toast.success(t('success'));
          form.reset();
        } else {
          const message = result?.data?.error || t('fail');
          setError(message);
          toast.error(message);
        }
      } catch (err) {
        console.error('Contact form submission error:', err);
        setError(t('fail'));
        toast.error(t('fail'));
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')} *</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-sm"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('company')} *</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-sm"
                    autoComplete="organization"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')} *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="rounded-sm"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phone')}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    className="rounded-sm"
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="enquiryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('enquiryType')} *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue placeholder={t('enquiryPlaceholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ENQUIRY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {t(`enquiryOptions.${type}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('message')} *</FormLabel>
              <FormControl>
                <Textarea className="rounded-sm" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 pt-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-0.5 rounded-[2px]"
                />
              </FormControl>
              <div className="space-y-1.5">
                <FormLabel className="text-[14px] font-normal leading-relaxed text-muted-foreground">
                  {t.rich('consent', {
                    link: (chunks) => (
                      <LocaleLink
                        href={Routes.Privacy}
                        className="text-foreground underline decoration-primary underline-offset-4"
                      >
                        {chunks}
                      </LocaleLink>
                    ),
                  })}{' '}
                  *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormError message={error} />

        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="mt-1 w-fit rounded-sm"
        >
          {isPending ? t('submitting') : t('submit')}
          {!isPending && (
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          )}
        </Button>

        <p className="text-[13px] leading-relaxed text-muted-foreground">
          {t('retention')}
        </p>
      </form>
    </Form>
  );
}
