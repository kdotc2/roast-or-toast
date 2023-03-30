import { Html, Head, Main, NextScript } from 'next/document'
import siteMetadata from '@/data/siteMetadata'

export default function Document() {
  return (
    <Html lang={siteMetadata.language}>
      <Head />
      <body className="overscroll-none bg-[#f5f2f2] text-gray-900 antialiased dark:bg-[#1c1b1b] dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
