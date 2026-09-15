import Container from '@/components/layout/container';
import { BlurFadeDemo } from '@/components/magicui/example/blur-fade-example';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const pt = await getTranslations({ locale, namespace: 'AboutPage' });

  return constructMetadata({
    title: pt('title') + ' | ' + t('title'),
    description: pt('description'),
    canonicalUrl: getUrlWithLocale('/about', locale),
  });
}

/**
 * inspired by https://astro-nomy.vercel.app/about
 */
export default async function AboutPage() {
  const t = await getTranslations('AboutPage');

  return (
    <Container className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* about section */}
        <div className="relative max-w-(--breakpoint-md) mx-auto mb-24 mt-8 md:mt-16">
          <div className="mx-auto flex flex-col justify-between">
            <div className="grid gap-8 sm:grid-cols-2">
              {/* avatar and name */}
              <div className="flex items-center gap-8">
                <Avatar className="size-32 p-0.5">
                  <AvatarImage
                    className="rounded-full border-4 border-gray-200"
                    src="/logo.png"
                    alt="Logo"
                  />
                  <AvatarFallback>
                    <div className="size-32 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-4xl text-foreground">
                    {t('authorName')}
                  </h1>
                  <p className="text-base text-muted-foreground mt-2">
                    {t('authorBio')}
                  </p>
                </div>
              </div>

              {/* introduction */}
              <div>
                <p className="text-base text-muted-foreground">
                  {t('introduction')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* image section */}
        <BlurFadeDemo />
      </div>
    </Container>
  );
}
