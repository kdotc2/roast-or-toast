import { Html, Head, Main, NextScript } from 'next/document'
import siteMetadata from '@/data/siteMetadata'

export default function Document() {
  return (
    <Html lang={siteMetadata.language}>
      <Head />
      <body className="overflow-x-hidden overscroll-y-none bg-[#f2f2f2] text-[#272727] antialiased dark:bg-[#0b0b0b] dark:text-[#dbdbdb]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
