import React from 'react';
import { DefaultSeo } from 'next-seo';
import 'tailwindcss/tailwind.css';
import './app.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        title="원랜디 조합도우미"
        description="간편한 원랜디 조합도우미. 현재 깍 이감등 수치를 계산해 보여줍니다. 원랜디 원피스랜덤디펜스 원랜디조합"
        canonical="https://www.kaizoku.kr"
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
          {
            rel: 'icon',
            href: '/android-chrome-192x192.png',
          },
          {
            rel: 'icon',
            href: '/android-chrome-512x512.png',
          },
          {
            rel: 'icon',
            href: '/favicon-16x16.png',
          },
          {
            rel: 'icon',
            href: '/favicon-32x32.png',
          },
        ]}
      />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
